import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionSecret,
  isSecureAdminCookie,
  validateAdminCredentials,
} from "@/lib/admin/auth";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  const sessionSecret = getAdminSessionSecret();

  if (!sessionSecret) {
    return NextResponse.json(
      { error: "Admin credentials are not configured for this environment." },
      { status: 500 },
    );
  }

  if (!validateAdminCredentials(body.username ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionSecret,
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureAdminCookie(),
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
