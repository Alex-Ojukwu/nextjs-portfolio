import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, message, subject } = body;

    // Validate required fields
    if (!email || !message || !subject) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Debug: Log if environment variables exist (without showing actual values)
    console.log("Environment variables check:", {
      hasOutlookUser: !!process.env.OUTLOOK_USER,
      hasOutlookPassword: !!process.env.OUTLOOK_PASSWORD,
      hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
    });

    // Create transporter with Outlook SMTP
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Portfolio Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message}
          </p>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });

  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}