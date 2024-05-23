import axios from 'axios';

const prodUrl = 'http://localhost:3095';
const devUrl = 'http://localhost:3095';

const request = axios.create({
  baseURL: process.env.NODE_ENV === prodUrl ? '' : devUrl,
  withCredentials: true,
});
export default request;
