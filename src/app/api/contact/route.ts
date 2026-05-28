import { NextResponse } from "next/server";
import { Resend } from "resend";

// Using a fallback dummy key so the build doesn't crash if the key isn't set yet
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_123");

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("No RESEND_API_KEY found! Returning success for UI testing.");
      // Simulate network delay for realistic UI testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, dummy: true });
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      // Resend free tier requires sending FROM onboarding@resend.dev
      from: "Portfolio Form <onboarding@resend.dev>",
      // Replace this with the email you signed up to Resend with!
      to: ["kidakorn.1@gmail.com"], 
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email, // This allows you to click "Reply" in your email client and reply directly to them!
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #C8102E;">New Message from your Portfolio!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.5; color: #333;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
