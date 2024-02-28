const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000 * 3; // 90 days in milliseconds

interface CookieOptions {
  httpOnly: boolean;
  path: string;
  maxAge: number;
  sameSite: 'lax' | 'none' | 'strict';
  secure: boolean;
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true, // PROD: true in production
  path: '/', // The path where the cookie is valid
  maxAge: COOKIE_MAX_AGE,
  sameSite: 'lax', // PROD: in production, set to 'none' if your client is on a different domain
  secure: false, // PROD: true in production
};
