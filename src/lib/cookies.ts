'use server';

import { AuthenticatedUser } from '@/interfaces/AuthenticatedUser';
import { cookies } from 'next/headers';

export async function setAuthCookies(accessToken: string, expiry: string, user: AuthenticatedUser) {
  const cookieStore = await cookies();
  const now = Date.now();
  const tokenExpiry = new Date(expiry);

  if(isNaN(tokenExpiry.getTime())){
    throw new Error("Invalid expiry date.");
  }

  const diff = tokenExpiry.getTime() - now;

  if(diff <= 0){
    throw new Error("Token expiry must be in future date.");
  }

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: diff/1000,
  });

  cookieStore.set('auth_user', JSON.stringify(user), {
    secure: true,
    sameSite: 'strict',
    maxAge: diff/1000
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('auth_user');
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const authUserCookie = cookieStore.get('authenticated_user');
  const authUser = authUserCookie ? authUserCookie.value : undefined;
  console.log('authUser',JSON.stringify(authUser));
  return authUser
}
