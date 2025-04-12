import { Category } from '@/interfaces/Category';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44312/api'
});

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await instance.get('/category/get-all');
    console.log('🔥 Response data:', res.data);
    
    // Ensure the response is in the correct format
    const categories: Category[] = Array.isArray(res.data)
        ? res.data.map((item) => ({
            id: item.id,
            name: item.name,
        }))
        : [];
    
    return categories;
} catch (err) {
    console.error('🔥 Axios error:', err);
    throw err;
}
}

export const isAxiosError =  axios.isAxiosError;

export default instance;
