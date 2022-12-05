import create from 'zustand';
import { persist } from 'zustand/middleware';

type UseToken = {
    token: string;
    setToken: (token: string) => void;
    removeToken: () => void;
};

const useToken = create(
    persist<UseToken>(
        (set, get) => ({
            token: '',
            setToken: (token: string) => set({ token }),
            removeToken: () => set({ token: '' })
        }),
        {
            name: 'token-storage',
            getStorage: () => localStorage
        }
    )
);

export default useToken;
