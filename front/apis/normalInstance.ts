import axios from 'axios';

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3095'
    : 'http://localhost:3095';

const normalInstance = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export default normalInstance;
