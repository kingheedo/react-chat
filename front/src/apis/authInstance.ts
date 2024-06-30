import { ITokenStore } from '@store/TokenStore';
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

export interface IToken
  extends Pick<ITokenStore, 'accessToken' | 'refreshToken'> {}

const prodUrl = 'http://localhost:3095';
const devUrl = 'http://localhost:3095';

const authInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER_PROD_URL
      : process.env.SERVER_DEV_URL,
  withCredentials: true,
});

authInstance.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem('TokenStore')
      ? (JSON.parse(localStorage.getItem('TokenStore') || '').state as IToken)
      : null;

    if (!tokens || !tokens.accessToken) {
      return config;
    }

    config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    console.error(error);
    return Promise.reject(error);
  }
);
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    let isRefreshing = false;
    const tokens = localStorage.getItem('TokenStore')
      ? (JSON.parse(localStorage.getItem('TokenStore') || '').state as IToken)
      : null;

    if (status === 401 && tokens && tokens.refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            '/api/users/refreshToken',
            {
              refreshToken: tokens.refreshToken,
            },
            {
              baseURL: process.env.NODE_ENV === prodUrl ? '' : devUrl,
              withCredentials: true,
            }
          );
          localStorage.setItem(
            'TokenStore',
            JSON.stringify({
              state: {
                accessToken: res.data.accessToken,
                refreshToken: tokens.refreshToken,
              },
            })
          );
          originalRequest.headers['Authorization'] =
            `Bearer ${res.data.accessToken}`;
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            authInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue.length = 0;
          return authInstance(originalRequest);
        } catch (error) {
          // console.error('error', error);
          // console.log('log', error);
          localStorage.setItem(
            'TokenStore',
            JSON.stringify({
              state: {
                accessToken: '',
                refreshToken: '',
              },
            })
          );
          const { data } =
            isAxiosError(error) && error.response && error.response.data;

          if (data === '다시 로그인 해주세요') {
            location.href = '/login';
          }
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default authInstance;
