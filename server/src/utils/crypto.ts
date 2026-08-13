import { createHash, randomBytes } from "node:crypto";

export function generateSecureToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getClientIp(
  forwardedFor: string | string[] | undefined,
  socketAddress: string | undefined,
): string | undefined {
  if (typeof forwardedFor === "string") {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  if (Array.isArray(forwardedFor) && forwardedFor[0]) {
    return forwardedFor[0].trim();
  }

  return socketAddress;
}
