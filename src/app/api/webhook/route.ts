import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle webhook events from Farcaster
    // Common events: miniapp_added, miniapp_removed, notifications_enabled, etc.
    console.log("Webhook received:", body);

    // You can store user notification tokens here for sending notifications later
    // For now, just acknowledge the webhook
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
