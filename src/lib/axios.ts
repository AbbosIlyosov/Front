import { CreateAccountPayload } from '@/interfaces/CreateAccountPayload';
import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers';

const instance = axios.create({
  baseURL: 'https://localhost:44312/api',
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

export const getAxiosInstanceWithAuthorizationHeader = async () => {

  const cookieStore = await cookies(); // don't await
  const token = cookieStore.get('access_token')?.value;

  return axios.create({
    baseURL: 'https://localhost:44312/api',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAccount = async (payload: CreateAccountPayload) => {
  return await instance.post('/auth/create-account', payload)
};

export const getAll = async () => {
  return await instance.get('/category/get-all');
}

export const isAxiosError =  axios.isAxiosError;

export default instance;
