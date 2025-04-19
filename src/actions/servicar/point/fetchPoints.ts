'use server';

import { PointsFilterParams, PointsGridInfo } from '@/interfaces/Point';
import axios from '@/lib/axios';

export async function fetchPointsForGrid(params: PointsFilterParams): Promise<PointsGridInfo[]> {
  try {
    const res = await axios.get('/point/filtered', { params });

    return res?.data;

  } catch (err: unknown) {
    console.log('error =>  ', err);
    throw err;
  }
}
