export {};

declare global {
    type User = {
        name: string;
        email: string;
    };

    enum TodoNotificationType {
        taskReminder = 'taskReminder',
        social = 'social'
    }
    type TodoNotification = {
        title: string;
        contents: string;
        type: TodoNotificationType;
    };
}
