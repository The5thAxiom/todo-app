type user = {
    name: string;
    email: string;
};

//table
type userForDb = user & {
    password: string;
};

enum todoPriority {
    high = 'high',
    medium = 'medium',
    low = 'low'
}

//table
type todo = {
    creator: user;
    creationDateTime: Date;
    collaborators: user[];
    tags: string[];

    title: string;
    description?: string;
    priority?: todoPriority;
    hasDate?: boolean;
    hasTime?: boolean;
    dateTime?: Date;
};
