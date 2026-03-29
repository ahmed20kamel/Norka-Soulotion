import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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

    const { error } = await resend.emails.send({
      from: "NORKA Website <info@norkasolution.com>",
      to: [process.env.CONTACT_EMAIL || "info@norkasolution.com"],
      replyTo: email,
      subject: `New Inquiry: ${serviceLabels[service] || service} — ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); padding: 32px; text-align: center;">
            <h1 style="color: #C9A96E; margin: 0; font-size: 24px; font-weight: 700;">New Contact Inquiry</h1>
            <p style="color: #999; margin: 8px 0 0; font-size: 14px;">norkasolution.com</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #888; font-size: 13px; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #1a1a1a; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8;"><a href="mailto:${email}" style="color: #C9A96E; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #888; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #1a1a1a;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #888; font-size: 13px;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: #1a1a1a; font-weight: 600;">${serviceLabels[service] || service}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #e5e0d8;">
              <p style="color: #888; font-size: 13px; margin: 0 0 8px;">Message</p>
              <p style="color: #1a1a1a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f0ebe3; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">Sent from NORKA Solution website contact form</p>
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
