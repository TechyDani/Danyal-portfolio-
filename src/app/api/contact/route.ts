import { NextRequest, NextResponse } from "next/server";
import { expertise, site } from "@/lib/content";
import { services } from "@/lib/services";

export const runtime = "nodejs";
// Best-effort abuse protection per running instance. For distributed hosting,
// also enable the platform's shared WAF/rate limiting before exposing this API.
const attempts = new Map<string, { count: number; reset: number }>();
const projectTypes = new Set([
  ...services.map((item) => item.title),
  ...expertise.map((item) => item.title),
  "Creative collaboration",
  "Something else",
]);
const budgets = new Set([
  "",
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Let’s discuss",
]);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== request.nextUrl.origin &&
    origin !== process.env.NEXT_PUBLIC_SITE_URL
  )
    return NextResponse.json(
      { error: "This request isn’t allowed." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Please submit the contact form." },
      { status: 415 },
    );
  // Read a bounded stream: Content-Length alone cannot constrain chunked requests.
  let body = "";
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json(
      { error: "Your inquiry is empty." },
      { status: 400 },
    );
  let bytes = 0;
  try {
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 20000) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Your message is too long." },
          { status: 413 },
        );
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch {
    return NextResponse.json(
      { error: "Couldn’t read your inquiry." },
      { status: 400 },
    );
  }
  let data: Record<string, unknown>;
  try {
    const parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    data = parsed;
  } catch {
    return NextResponse.json(
      { error: "Please check your inquiry and try again." },
      { status: 400 },
    );
  }
  if (typeof data.website === "string" && data.website.trim())
    return NextResponse.json({ success: true });
  const text = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = text("name"),
    email = text("email"),
    projectType = text("projectType"),
    message = text("message"),
    budget = text("budget");
  if (
    name.length < 2 ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !projectTypes.has(projectType) ||
    !budgets.has(budget) ||
    message.length < 20 ||
    message.length > 5000
  )
    return NextResponse.json(
      {
        error:
          "Please provide a valid name, email, project type, and a message of 20–5,000 characters.",
      },
      { status: 400 },
    );
  if (
    typeof data.startedAt !== "number" ||
    !Number.isFinite(data.startedAt) ||
    Date.now() - data.startedAt < 2000 ||
    Date.now() - data.startedAt > 86400000
  )
    return NextResponse.json(
      {
        error: "Please take a moment to complete your inquiry, then try again.",
      },
      { status: 400 },
    );
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.reset <= now) attempts.delete(key);
  const key = email.toLowerCase();
  const attempt = attempts.get(key) ?? { count: 0, reset: now + 600000 };
  if (attempt.count >= 3 || attempts.size >= 10000)
    return NextResponse.json(
      { error: "Please wait a few minutes before sending another inquiry." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL)
    return NextResponse.json(
      {
        error: `Email delivery isn’t connected yet. Please email ${site.email} directly.`,
      },
      { status: 503 },
    );
  attempt.count++;
  attempts.set(key, attempt);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: email,
        subject: `Portfolio inquiry: ${projectType}`,
        text: `From: ${name}\nEmail: ${email}\nProject: ${projectType}\nBudget: ${budget || "Not specified"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Delivery provider rejected inquiry");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Your inquiry couldn’t be delivered. Please try again or email me directly.",
      },
      { status: 502 },
    );
  }
}
