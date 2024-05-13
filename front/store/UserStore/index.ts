import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseUserStore {
  userId: number;
  setUserId: (userId: number) => void;
}

const useUserStore = create(
  persist<IUseUserStore>(
    (set, get) => ({
      userId: -1,
      setUserId: (userId: number) => set(() => ({ userId })),
    }),
    {
      name: 'UserStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
