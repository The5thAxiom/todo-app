import { ObjectId } from 'mongodb';
export {};

declare global {
    type User = {
        _id?: ObjectId;
        name: string;
        email: string;
    };

    //table
    type UserForDb = User & {
        password: string;
    };

    //table
    type Todo = {
        _id?: ObjectId;
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
