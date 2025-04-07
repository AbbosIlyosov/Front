// lib/axios.ts
import axios from 'axios';
import https from 'https';

const instance = axios.create({
  baseURL: 'https://localhost:44312/api',
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export default instance;
