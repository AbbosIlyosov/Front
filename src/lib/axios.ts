import axios from 'axios';
import https from 'https';

const instance = axios.create({
  baseURL: 'https://localhost:44312/api',
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export const createAccount = async (payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  return await instance.post('/auth/create-account', payload)
};

export const getAll = async () => {
  return await instance.get('/category/get-all');
}

export const isAxiosError =  axios.isAxiosError;

export default instance;
