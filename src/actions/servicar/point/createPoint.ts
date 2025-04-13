'use server';

import { CreatePointPayload } from '@/interfaces/CreatePointPayload';
import axios from '@/lib/axios';
import { cookies } from 'next/headers';

export async function createPointAction(payload: CreatePointPayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const res = await axios.post('/point/create', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, errorMessage: null };
    }

    if (res.data) {
      return { success: false, errorMessage: res.data };
    }

    return { success: false, errorMessage: 'Something went wrong!' };
  } catch (err) {
    throw err;
  }
}
