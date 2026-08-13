import { env } from "../config/env.js";
import { generateSecureToken, hashToken } from "../utils/crypto.js";

export function createSessionToken(): { rawToken: string; tokenHash: string } {
  const rawToken = generateSecureToken(32);
  return { rawToken, tokenHash: hashToken(rawToken) };
}

export function createVerificationToken(): { rawToken: string; tokenHash: string } {
  const rawToken = generateSecureToken(32);
  return { rawToken, tokenHash: hashToken(rawToken) };
}

export function createPasswordResetToken(): { rawToken: string; tokenHash: string } {
  const rawToken = generateSecureToken(32);
  return { rawToken, tokenHash: hashToken(rawToken) };
}

export function hashProvidedToken(token: string): string {
  return hashToken(token);
}

export function getSessionExpiryDate(): Date {
  return new Date(Date.now() + env.SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
}

export function getVerificationExpiryDate(): Date {
  return new Date(Date.now() + env.VERIFICATION_TOKEN_HOURS * 60 * 60 * 1000);
}

export function getPasswordResetExpiryDate(): Date {
  return new Date(Date.now() + env.RESET_TOKEN_HOURS * 60 * 60 * 1000);
}

export function createCsrfToken(): string {
  return generateSecureToken(32);
}
