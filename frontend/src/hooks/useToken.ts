import create from 'zustand';
import { persist } from 'zustand/middleware';

type UseToken = {
    token: string;
    setToken: (token: string) => void;
    unsetToken: () => void;
};

const useToken = create(
    persist<UseToken>(
        (set, get) => ({
            token: null as any,
            setToken: (token: string) => set({ token }),
            unsetToken: () => set({ token: null as any })
        }),
        {
            name: 'token-storage',
            getStorage: () => localStorage
        }
    )
);

export default useToken;
