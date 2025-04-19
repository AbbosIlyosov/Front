'use server';

import { CreateAppointmentPayload } from '@/interfaces/Appointment';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function createAppointment(payload: CreateAppointmentPayload) {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();
    const res = await axios.post('/appointment/create', payload);

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
