// lib/cookies.ts
'use server';

import { cookies } from 'next/headers';

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  const accessExpiry = 15 * 60; // 15 minutes
  const refreshExpiry = 7 * 24 * 60 * 60; // 7 days

  (await cookieStore).set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: accessExpiry,
  });

  (await cookieStore).set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: refreshExpiry,
  });
}

export async function clearAuthCookies() {
  const cookieStore = cookies();
  (await cookieStore).delete('access_token');
  (await cookieStore).delete('refresh_token');
}
