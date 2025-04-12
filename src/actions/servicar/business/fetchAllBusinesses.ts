'use server';

import axios from '@/lib/axios';
import { Business, BusinessGridInfo, BusinessSelectList } from '@/interfaces/Business';

export async function fetchAllBusinesses(): Promise<Business[]> {
  try {
    const res = await axios.get('/business/get-all');

    return res?.data;

  } catch (err: unknown) {
    throw err;
  }
}


export async function fetchBusinessesForSelectList(): Promise<Business[]> {
  try {
    const res = await axios.get('/business/get-for-select-list');

    return res?.data;

  } catch (err: unknown) {
    throw err;
  }
}

export async function fetchBusinessesForGrid(): Promise<BusinessGridInfo[]> {
  try {
    const res = await axios.get('/business/get-grid-info');

    return res?.data;

  } catch (err: unknown) {
    throw err;
  }
}
