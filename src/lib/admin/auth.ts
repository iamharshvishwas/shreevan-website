export const ADMIN_SESSION_COOKIE = "shreevan_admin_session";

export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const SESSION_TOKEN_CONTEXT = "shreevan-admin-session";

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

  return (
    constantTimeEqualsString(username.trim(), credentials.username) &&
    constantTimeEqualsString(password, credentials.password)
  );
}

export function hasConfiguredAdminCredentials() {
  return Boolean(getAdminCredentials() && getAdminSessionSecret());
}

async function signSessionPayload(secret: string, payload: string) {
  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqualsString(a: string, b: string) {
  const encoder = new TextEncoder();
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);
  let mismatch = bytesA.length === bytesB.length ? 0 : 1;
  const length = Math.max(bytesA.length, bytesB.length);

  for (let index = 0; index < length; index += 1) {
    mismatch |= (bytesA[index] ?? 0) ^ (bytesB[index] ?? 0);
  }

  return mismatch === 0;
}

export async function createAdminSessionToken(now = Date.now()) {
  const sessionSecret = getAdminSessionSecret();

  if (!sessionSecret) {
    return null;
  }

  const expiresAt = now + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${SESSION_TOKEN_CONTEXT}:${expiresAt}`;
  const signature = await signSessionPayload(sessionSecret, payload);

  return `${expiresAt}.${signature}`;
}

export async function isValidAdminSession(sessionValue?: string, now = Date.now()) {
  const sessionSecret = getAdminSessionSecret();

  if (!sessionSecret || !sessionValue) {
    return false;
  }

  const separatorIndex = sessionValue.indexOf(".");

  if (separatorIndex <= 0) {
    return false;
  }

  const expiresAtRaw = sessionValue.slice(0, separatorIndex);
  const providedSignature = sessionValue.slice(separatorIndex + 1);
  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= now) {
    return false;
  }

  const payload = `${SESSION_TOKEN_CONTEXT}:${expiresAt}`;
  const expectedSignature = await signSessionPayload(sessionSecret, payload);

  return constantTimeEqualsString(providedSignature, expectedSignature);
}

function readCookie(cookieHeader: string, name: string) {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

export async function isAdminRequestAuthorized(request: Request) {
  const sessionValue = readCookie(request.headers.get("cookie") ?? "", ADMIN_SESSION_COOKIE);

  return isValidAdminSession(sessionValue);
}

export function isSecureAdminCookie() {
  return process.env.NODE_ENV === "production";
}
