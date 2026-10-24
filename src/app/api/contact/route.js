
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const DAILY_LIMIT = 3;

function getIP(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 3000) {
      return NextResponse.json(
        { error: "Your message exceeds the allowed length." },
        { status: 400 }
      );
    }

    if (
      email &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    ) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ip = getIP(request);
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);

    const { count, error: countError } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", dayStart.toISOString());

    if (countError) {
      console.error("Rate-limit check failed:", countError);
      return NextResponse.json(
        { error: "Unable to process your message right now." },
        { status: 503 }
      );
    }

    if ((count ?? 0) >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily message limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error("Contact email environment variables are missing.");
      return NextResponse.json(
        { error: "Contact email is not configured yet." },
        { status: 503 }
      );
    }

    const { error: dbError } = await supabase
      .from("inquiries")
      .insert([{ name, email, message, ip }]);

    if (dbError) {
      console.error("Inquiry save failed:", dbError);
      return NextResponse.json(
        { error: "Unable to save your message right now." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      ...(email ? { replyTo: email } : {}),
      subject: `Portfolio message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
          <h2>New BuildsWithMohit contact message</h2>
          <p><strong>Name:</strong> ${escapeHTML(name)}</p>
          <p><strong>Email:</strong> ${
            email
              ? `<a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>`
              : "Not provided"
          }</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHTML(message)}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend delivery error:", emailError);
      return NextResponse.json(
        { error: "Message saved, but email delivery failed." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
