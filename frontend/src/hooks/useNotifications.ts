import create from 'zustand';
import { persist } from 'zustand/middleware';

type NotificationStore = {
    notifications: TodoNotification[];
    addNotification: (notification: TodoNotification) => void;
    removeNotification: (index: number) => void;
    clearNotifications: () => void;
};

const useNotifications = create(
    persist<NotificationStore>(
        (set, get) => ({
            notifications: [],
            addNotification: notification =>
                set({ notifications: [...get().notifications, notification] }),
            removeNotification: index => {
                set({
                    notifications: get().notifications.filter(
                        (n, i) => i !== index
                    )
                });
            },
            clearNotifications: () => {
                set({ notifications: [] });
            }
        }),
        { name: 'notifications-store', getStorage: () => sessionStorage }
    )
);

export default useNotifications;
