import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "./lib/admin/auth";
import { isAdminHostname } from "./lib/site/is-admin-host";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin";

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

// Marks the request as admin-area for downstream Server Components (e.g. the
// root layout, to skip loading third-party analytics/ad scripts there) that
// can't otherwise tell -- headers() has no pathname, and the admin subdomain
// rewrite happens here in middleware before any layout renders.
function withAdminAreaHeader(request: NextRequest, isAdminArea: boolean) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-shreevan-admin-area", isAdminArea ? "1" : "0");

  return { request: { headers: requestHeaders } };
}

export async function proxy(request: NextRequest) {
  const isAdminSubdomain = isAdminHostname(request.headers.get("host"));
  const pathname = request.nextUrl.pathname;
  const effectivePath = effectiveAdminPath(pathname, isAdminSubdomain);
  const isAdminArea = isAdminRoute(effectivePath);
  const isAdminApi = pathname.startsWith("/api/admin/");

  // Admin is reachable ONLY via admin.shreevanwellness.com. This is not the
  // auth boundary (the session check below already covers both hosts) -- it's
  // about not letting /admin and /api/admin/* exist at all on the well-known,
  // commonly-probed main domain. A redirect here would still confirm "yes,
  // an admin panel exists, here's where" to any bot/scanner hitting /admin;
  // 404 gives away nothing.
  if (!isAdminSubdomain && (isAdminArea || isAdminApi)) {
    return new NextResponse(null, { status: 404 });
  }

  if (!isAdminArea && !isAdminApi) {
    return NextResponse.next(withAdminAreaHeader(request, false));
  }

  if (isAdminApi) {
    return NextResponse.next(withAdminAreaHeader(request, true));
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

    return NextResponse.rewrite(rewriteUrl, withAdminAreaHeader(request, true));
  }

  return NextResponse.next(withAdminAreaHeader(request, true));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
