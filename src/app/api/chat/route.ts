import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are NORKA Solution's AI assistant on their website. You help visitors learn about the company and its services. Be professional, friendly, and concise.

**About NORKA Solution:**
- Leading IT solutions provider based in the UAE
- Offices in Abu Dhabi, Al Ain, and Dubai
- Founded by Ahmed Kamel (CEO & Founder)
- Managing Director: Eng. Nourhan

**Services:**
1. Web Applications — Custom web apps with React, Next.js, and modern frameworks
2. Mobile Apps — Native and cross-platform iOS/Android development
3. ERP Systems — Enterprise resource planning (inventory, HR, payroll, finance)
4. Website Development — Modern responsive websites and e-commerce
5. IT Infrastructure & Servers — Network design, server management, cloud migration
6. UI/UX Design — User research, wireframing, prototyping, design systems
7. Social Media & Marketing — Content strategy, SEO, paid advertising
8. Company Setup & IT Consulting — Digital transformation, technology audits

**Contact Information:**
- Phone: +971 50 725 7157
- Email: info@norkasolution.com
- Working Hours: Sunday - Thursday, 9:00 AM - 6:00 PM (UAE time)
- Locations: Abu Dhabi, Al Ain, Dubai

**Guidelines:**
- Answer questions about services, pricing approach, timelines, and company info
- For pricing: explain that pricing depends on project scope and requirements, and encourage them to contact the team for a free consultation
- If someone wants to speak with a human, direct them to WhatsApp (+971 50 725 7157) or email
- Keep responses concise (2-4 sentences max unless detailed info is requested)
- Be bilingual: respond in the same language the visitor uses (Arabic or English)
- Never make up information you don't know — suggest contacting the team instead
- Be warm and professional, reflecting NORKA's premium brand image`;

export async function POST(request: NextRequest) {
  try {
    const { messages, locale } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formattedMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })
    );

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system:
        SYSTEM_PROMPT +
        `\n\nThe visitor is currently browsing in ${locale === "ar" ? "Arabic" : "English"}. Default to responding in that language unless they switch.`,
      messages: formattedMessages,
    });

    const textContent = response.content.find((c) => c.type === "text");
    const reply = textContent ? textContent.text : "";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to get response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
