type userId = string;

type user = {
    id: userId;
    name: string;
    email: string;
};

//table
type userForDb = user & {
    password: string;
};

type todoId = string;

enum todoPriority {
    high = 'high',
    medium = 'medium',
    low = 'low'
}

type tag = {
    id: string;
    name: string;
};

//table
type todo = {
    id: todoId;
    creatorId: userId;
    creationDateTime: Date;
    collaborators: user[];
    tags: tag[];

    title: string;
    description?: string;
    priority?: todoPriority;
    hasDate?: boolean;
    hasTime?: boolean;
    dateTime?: Date;
};
