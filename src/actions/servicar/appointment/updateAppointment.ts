'use server';

import { AppointmentStatus } from '@/enums/AppointmentStatus';
import { UpdateAppointmentPayload } from '@/interfaces/Appointment';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function updateAppointmentStatus(appointmentId: number, status: AppointmentStatus) {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();

    const payload: UpdateAppointmentPayload  = {
        id: appointmentId,
        statusId: status
    }

    const res = await axios.put('/appointment/update', payload);

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
