import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "./lib/admin/auth";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin";

function isAdminHost(hostHeader: string | null) {
  const hostname = hostHeader?.split(":")[0].toLowerCase() ?? "";

  return hostname.startsWith("admin.");
}

function effectiveAdminPath(pathname: string, isAdminSubdomain: boolean) {
  if (!isAdminSubdomain || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return pathname;
  }

  return pathname === "/" ? ADMIN_DASHBOARD_PATH : `/admin${pathname}`;
}

function isAdminRoute(pathname: string) {
  return pathname === ADMIN_DASHBOARD_PATH || pathname.startsWith(`${ADMIN_DASHBOARD_PATH}/`);
}

function shouldRewriteAdminHost(pathname: string, isAdminSubdomain: boolean) {
  return isAdminSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api");
}

export async function proxy(request: NextRequest) {
  const isAdminSubdomain = isAdminHost(request.headers.get("host"));
  const pathname = request.nextUrl.pathname;
  const effectivePath = effectiveAdminPath(pathname, isAdminSubdomain);
  const isAdminArea = isAdminRoute(effectivePath);
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminArea && !isAdminApi) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const hasSession = await isValidAdminSession(session);
  const isLoginPage = effectivePath === ADMIN_LOGIN_PATH;

  if (!hasSession && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = isAdminSubdomain ? "/login" : ADMIN_LOGIN_PATH;
    loginUrl.search = "";
    loginUrl.searchParams.set("next", isAdminSubdomain ? pathname : effectivePath);

    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = isAdminSubdomain ? "/" : ADMIN_DASHBOARD_PATH;
    dashboardUrl.search = "";

    return NextResponse.redirect(dashboardUrl);
  }

  if (shouldRewriteAdminHost(pathname, isAdminSubdomain)) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = effectivePath;

    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
