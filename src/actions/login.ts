'use server';

import axios from '@/lib/axios';
import { setAuthCookies } from '@/lib/cookies';

export async function loginAction(email: string, password: string) {
  try {
    const res = await axios.post('/auth/login', { email, password });

    if (res.data) {
      const { accessToken, tokenExpiry, user } = res.data;
      await setAuthCookies(accessToken, tokenExpiry, user);
      return res.data;
    }
    return null;
  } catch (err: unknown) {

    if (err instanceof Error) {
      return err.message;
    }

    return 'An unknown error occurred';
  }
}
