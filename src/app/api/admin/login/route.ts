import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
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

  const sessionToken = await createAdminSessionToken();

  if (!sessionToken) {
    return NextResponse.json(
      { error: "Admin credentials are not configured for this environment." },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureAdminCookie(),
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
