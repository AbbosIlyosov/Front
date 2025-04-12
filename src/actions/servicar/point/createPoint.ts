'use server';

import { CreatePointPayload } from '@/interfaces/CreatePointPayload';
import axios from '@/lib/axios';

export async function createPointAction(payload: CreatePointPayload) {
  try {
    const res = await axios.post('/point/create', payload);

    if (res.status === 200) {
      return {success: true, errorMessage: null};
    }

    if(res.data){
      return {success: false, errorMessage: res.data};
    }

    return {success: false, errorMessage: 'Something went wrong!'}

  } catch (err) {
    throw err;
  }
}
