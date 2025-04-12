'use server';

import axios, { isAxiosError } from '@/lib/axios';
import { CreateAccountPayload } from '@/interfaces/CreateAccountPayload';


export async function registerAction(payload: CreateAccountPayload) {
  try {
    const res = await axios.post('/auth/create-account', payload);

    if (res.status === 200) {
      return {success: true, errorMessage: null};
    }

    if(res.data){
      return {success: false, errorMessage: res.data};
    }

    return {success: false, errorMessage: 'Something went wrong!'}

  } catch (err: unknown) {

    if (isAxiosError(err)) {
      // Access the error message from the backend response
      const message = err.response?.data?.message || err.response?.data || err.message;
      return { success: false, errorMessage: message };
    }

    return { success: false, errorMessage: 'An unknown error occurred.' };
  }
}
