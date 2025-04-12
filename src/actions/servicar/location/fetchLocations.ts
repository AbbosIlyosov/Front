'use server';

import axios from '@/lib/axios';
import { Location } from '@/interfaces/Location';

export async function fetchLocations(): Promise<Location[]> {
  try {
    const res = await axios.get('/location/get-all');

    return res?.data;

  } catch (err: unknown) {
    throw err;
  }
}
