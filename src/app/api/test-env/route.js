import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasOutlookUser: !!process.env.OUTLOOK_USER,
    hasOutlookPassword: !!process.env.OUTLOOK_PASSWORD,
    hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
  });
}