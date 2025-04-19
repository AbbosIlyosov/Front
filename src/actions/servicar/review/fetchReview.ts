'use server';

import { Review } from '@/interfaces/Review';
import { getAxiosInstanceWithAuthorizationHeader } from '@/lib/axios';

export async function fetchAllReviews(): Promise<Review[]> {
  try {
    const axios = await getAxiosInstanceWithAuthorizationHeader();
    const res = await axios.get('/review/get-all');

    return res?.data;

  } catch (err: unknown) {
    console.log('error =>  ', err);
    throw err;
  }
}
