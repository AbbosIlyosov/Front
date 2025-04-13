'use server';

import axios from '@/lib/axios';
import { Category } from '@/interfaces/Category';

export async function fetchCategoriesAction(): Promise<Category[]> {
  try {
    const res = await axios.get('/category/get-all');

    return [{id:0, name: 'All'}, ...res?.data];

  } catch (err: unknown) {
    throw err;
  }
}
