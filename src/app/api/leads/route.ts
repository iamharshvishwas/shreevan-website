import { NextResponse } from "next/server";
import { appendAdminLead } from "@/lib/admin/seo-leads";
import type { AdminLeadInput, AdminLeadSource } from "@/lib/admin/seo-leads";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function booleanValue(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function sourceValue(value: unknown): AdminLeadSource {
  return value === "book-consultation" || value === "contact" || value === "home-suitability"
    ? value
    : "home-suitability";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  const leadInput: AdminLeadInput = {
    source: sourceValue(body.source),
    name: stringValue(body.name),
    email: stringValue(body.email),
    phone: stringValue(body.phone),
    country: stringValue(body.country),
    program: stringValue(body.program),
    topic: stringValue(body.topic),
    message: stringValue(body.message),
    goal: stringValue(body.goal),
    dates: stringValue(body.dates),
    season: stringValue(body.season),
    health: stringValue(body.health),
    consent: booleanValue(body.consent),
  };

  if (!leadInput.name || !leadInput.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!leadInput.consent) {
    return NextResponse.json({ error: "Consent is required before submitting." }, { status: 400 });
  }

  try {
    const lead = await appendAdminLead(leadInput);

    return NextResponse.json({ leadId: lead.id, status: "received" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lead could not be saved." }, { status: 500 });
  }
}
