import create from 'zustand';
import { persist } from 'zustand/middleware';

type UseToken = {
    token: string | null;
    setToken: (token: string) => void;
    unsetToken: () => void;
};

const useToken = create(
    persist<UseToken>(
        set => ({
            token: null,
            setToken: (token: string) => set({ token }),
            unsetToken: () => set({ token: null })
        }),
        {
            name: 'token-storage',
            getStorage: () => localStorage
        }
    )
);

export default useToken;
