'use server';

import { AddReviewPayload } from '@/interfaces/Review';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function addReview(payload: AddReviewPayload) {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();

    const res = await axios.post('/review/create', payload);

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
