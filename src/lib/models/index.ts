export type User = {
    id: string;
    /** Is empty if not set. */
    name: string;
    email: string;
    created: Date;
    updated: Date;
    /** Is empty if not set. */
    avatar: string;
};

type TaskPriority = "low" | "medium" | "high" | "urgent" | "none";

export type Task = {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: Date;
    created: Date;
    updated: Date;
};
