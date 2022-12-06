import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    unsetUser: () => void;
};

const useUser = create(
    persist<UserStore>(
        set => ({
            user: null,
            setUser: (user: User) => set({ user }),
            unsetUser: () => set({ user: null })
        }),
        {
            name: 'user-store',
            getStorage: () => sessionStorage
        }
    )
);

export default useUser;
