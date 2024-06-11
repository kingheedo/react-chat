import authInstance from '@apis/authInstance';
import axios from 'axios';

const prodUrl = 'http://localhost:3095';
const devUrl = 'http://localhost:3095';

const request = axios.create({
  baseURL: process.env.NODE_ENV === prodUrl ? '' : devUrl,
  withCredentials: true,
});

const fetcher = (url: string) => {
  return authInstance.get(url).then((response) => response.data);
};

export default fetcher;
