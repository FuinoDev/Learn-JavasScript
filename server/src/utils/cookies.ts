import type { CookieOptions, Response } from "express";
import { env, isProduction } from "../config/env.js";

export const SESSION_COOKIE = "session_token";
export const CSRF_COOKIE = "csrf_token";

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
};

export function getSessionCookieOptions(maxAgeMs: number): CookieOptions {
  return {
    ...baseCookieOptions,
    maxAge: maxAgeMs,
  };
}

export function getCsrfCookieOptions(maxAgeMs: number): CookieOptions {
  return {
    httpOnly: false,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeMs,
  };
}

export function setSessionCookie(res: Response, token: string, maxAgeMs: number): void {
  res.cookie(SESSION_COOKIE, token, getSessionCookieOptions(maxAgeMs));
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, {
    ...baseCookieOptions,
  });
}

export function setCsrfCookie(res: Response, token: string, maxAgeMs: number): void {
  res.cookie(CSRF_COOKIE, token, getCsrfCookieOptions(maxAgeMs));
}

export function clearCsrfCookie(res: Response): void {
  res.clearCookie(CSRF_COOKIE, {
    httpOnly: false,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });
}

export function getSessionMaxAgeMs(): number {
  return env.SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}
