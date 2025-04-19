'use server';

import { FetchAppointmentParams, MyAppointment } from '@/interfaces/Appointment';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function fetchMyAppointment(params: FetchAppointmentParams): Promise<MyAppointment> {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();
    const res = await axios.get('/appointment/get-my-appointment', { params });
    return res.data;
    
  } catch (err: unknown) {
    console.log('error =>  ', err);
    throw err;
  }
}

export async function fetchMyAllAppointments(): Promise<MyAppointment[]> {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();
    const res = await axios.get('/appointment/get-my-all-appointments');
    return res.data;
    
  } catch (err: unknown) {
    console.log('error =>  ', err);
    throw err;
  }
}
