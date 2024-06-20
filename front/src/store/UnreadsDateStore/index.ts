import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IUnreadsDateStoreStore {
  unreadsDate: { [key: string]: string }[];
  setUnreadsDate: (key: string, value: string) => any;
}

const useUnreadsDateStore = create(
  persist<IUnreadsDateStoreStore>(
    (set, get) => ({
      unreadsDate: [],
      setUnreadsDate: (key, value) =>
        set((state) => {
          const existIdx = state.unreadsDate.findIndex((unread) => {
            return unread[key];
          });

          if (existIdx !== -1) {
            const updatedUnreadsDate = [...state.unreadsDate];
            updatedUnreadsDate[existIdx] = { [key]: value };
            return { unreadsDate: updatedUnreadsDate };
          } else {
            return { unreadsDate: [...state.unreadsDate, { [key]: value }] };
          }
        }),
    }),
    {
      name: 'UnreadsDateStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUnreadsDateStore;
