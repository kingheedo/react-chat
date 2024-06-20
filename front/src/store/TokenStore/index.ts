import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ITokenStore {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

const useTokenStore = create(
  persist<ITokenStore>(
    (set, get) => ({
      accessToken: '',
      refreshToken: '',
      setAccessToken: (token: string) =>
        set(() => ({ accessToken: token, refreshToken: get().refreshToken })),
      setRefreshToken: (token: string) =>
        set(() => ({ accessToken: get().accessToken, refreshToken: token })),
    }),
    {
      name: 'TokenStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTokenStore;
