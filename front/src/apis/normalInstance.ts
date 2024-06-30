import axios from 'axios';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_PROD_URL
    : process.env.SERVER_DEV_URL;

const normalInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default normalInstance;
