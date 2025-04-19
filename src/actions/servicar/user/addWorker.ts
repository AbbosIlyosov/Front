'use server';

import { AddWorkerPayload } from '@/interfaces/User';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function createWorkerAccount(payload: AddWorkerPayload) {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();
    const res = await axios.put('/user/add-worker', payload);

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
