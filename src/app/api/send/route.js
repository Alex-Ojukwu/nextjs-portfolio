import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
    return NextResponse.json({
      success: false,
      message: "Email configuration missing",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Email temporarily disabled",
  });
}