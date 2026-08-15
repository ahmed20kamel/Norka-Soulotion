import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 120;
const MAX_MESSAGE_LEN = 5000;

// Escape user-supplied values before interpolating into the notification
// email's HTML — the fields below come straight from the public form.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Simple in-memory rate limit — one submission per IP per 30s. Resets on
// deploy/cold start, which is fine: this only needs to blunt rapid bot bursts,
// a real limiter (Upstash/Redis) is unnecessary at this traffic volume.
const lastSubmission = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, phone, service, message, website } = body;

    // Honeypot — real users never fill this in. Silently "succeed" so bots
    // don't learn to look for a different signal.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }

    if (name.trim().length === 0 || name.length > MAX_NAME_LEN) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (message.trim().length === 0 || message.length > MAX_MESSAGE_LEN) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const last = lastSubmission.get(ip);
    if (last && now - last < RATE_LIMIT_MS) {
      return NextResponse.json({ error: "Too many requests, please wait a moment" }, { status: 429 });
    }
    lastSubmission.set(ip, now);

    const serviceLabels: Record<string, string> = {
      webApp: "Web Applications",
      mobileApp: "Mobile Apps",
      erp: "ERP Systems",
      website: "Website Development",
      infrastructure: "IT Infrastructure & Servers",
      uiux: "UI/UX Design",
      marketing: "Social Media & Marketing",
      consulting: "Company Setup & IT Consulting",
      other: "Other",
    };

    const safeName    = escapeHtml(name.trim());
    const safeEmail   = escapeHtml(email.trim());
    const safePhone   = phone ? escapeHtml(String(phone)) : "Not provided";
    const safeMessage = escapeHtml(message.trim());
    const safeService = escapeHtml(serviceLabels[service] || service);

    const { error } = await resend.emails.send({
      from: "NORKA Website <info@norkasolution.com>",
      to: [process.env.CONTACT_EMAIL || "info@norkasolution.com"],
      replyTo: email,
      subject: `New Inquiry: ${serviceLabels[service] || service} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F8FAFC; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #060B18, #0D1424); padding: 32px; text-align: center;">
            <h1 style="color: #6384FF; margin: 0; font-size: 24px; font-weight: 700;">New Contact Inquiry</h1>
            <p style="color: #64748B; margin: 8px 0 0; font-size: 14px;">norkasolution.com</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #94A3B8; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #94A3B8; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${safeEmail}" style="color: #3B62FC; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #94A3B8; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #0F172A;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #94A3B8; font-size: 13px;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-weight: 600;">${safeService}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
              <p style="color: #94A3B8; font-size: 13px; margin: 0 0 8px;">Message</p>
              <p style="color: #0F172A; margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #F1F5F9; text-align: center;">
            <p style="color: #94A3B8; font-size: 12px; margin: 0;">Sent from NORKA Solution website contact form</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
