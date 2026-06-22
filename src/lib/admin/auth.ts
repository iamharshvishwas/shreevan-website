export const ADMIN_SESSION_COOKIE = "shreevan_admin_session";

type AdminCredentials = {
  username: string;
  password: string;
};

export function getAdminCredentials(): AdminCredentials | null {
  const username = process.env.SHREEVAN_ADMIN_USER;
  const password = process.env.SHREEVAN_ADMIN_PASSWORD;

  if (username && password) {
    return { username, password };
  }

  return null;
}

export function getAdminSessionSecret() {
  const secret = process.env.SHREEVAN_ADMIN_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  return null;
}

export function validateAdminCredentials(username: string, password: string) {
  const credentials = getAdminCredentials();

  if (!credentials) {
    return false;
  }

  return username.trim() === credentials.username && password === credentials.password;
}

export function hasConfiguredAdminCredentials() {
  return Boolean(getAdminCredentials() && getAdminSessionSecret());
}

export function isValidAdminSession(sessionValue?: string) {
  const sessionSecret = getAdminSessionSecret();

  if (!sessionSecret || !sessionValue) {
    return false;
  }

  return sessionValue === sessionSecret;
}

function readCookie(cookieHeader: string, name: string) {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export function isAdminRequestAuthorized(request: Request) {
  const sessionValue = readCookie(request.headers.get("cookie") ?? "", ADMIN_SESSION_COOKIE);

  return isValidAdminSession(sessionValue);
}

export function isSecureAdminCookie() {
  return process.env.NODE_ENV === "production";
}
