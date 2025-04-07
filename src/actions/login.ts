// app/actions/login.ts
'use server';

import axios from '@/lib/axios';
import { setAuthCookies } from '@/lib/cookies';

export async function loginAction(email: string, password: string) {
  try{
    
    console.log('login action');

    const res = await axios.post('/auth/login', {
      email,
      password,
    });
  
    const { accessToken, refreshToken } = res.data;
  
    await setAuthCookies(accessToken, refreshToken);

    return true;
  }
  catch(err:unknown){
    console.log('error from catch:', err.message);
    return false;
  }
}
