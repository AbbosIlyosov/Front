'use server';

import axios from '@/lib/axios';
import { WorkingTime } from '@/interfaces/WorkingTime';

export async function fetchWorkingTimes(): Promise<WorkingTime[]> {
  try {
    const res = await axios.get('/workingtime/get-all');

    return res?.data;

  } catch (err: unknown) {
    throw err;
  }
}
