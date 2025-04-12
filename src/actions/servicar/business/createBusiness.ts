'use server';

import { CreateBusinessPayload } from '@/interfaces/CreateBusinessPayload';
import axios from '@/lib/axios';

export async function createBusiness(payload: CreateBusinessPayload) {
  try {
    const res = await axios.post('/business/create', payload);

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
