import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
    user: User;
    setUser: (user: User) => void;
    unsetUser: () => void;
};

const useUser = create(
    persist<UserStore>(
        set => ({
            user: null as any,
            setUser: (user: User) => set({ user }),
            unsetUser: () => set({ user: null as any })
        }),
        {
            name: 'user-store',
            getStorage: () => sessionStorage
        }
    )
);

export default useUser;
