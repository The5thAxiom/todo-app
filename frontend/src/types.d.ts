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

    type Todo = {
        _id?: string;
        creator: User;
        creationDateTime: Date;
        collaborators: User[];
        tags: string[];

        title: string;
        description?: string;
        priority?: 'high' | 'medium' | 'low';
        hasDate?: boolean;
        hasTime?: boolean;
        dateTime?: Date;
    };
}
