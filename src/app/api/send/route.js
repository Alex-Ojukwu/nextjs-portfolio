// src/app/api/send/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  // dummy response, email functionality disabled
  return NextResponse.json({
    success: true,
    message: "Email sending is currently disabled.",
  });
}
