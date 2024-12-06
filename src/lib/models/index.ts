import type { RecordModel } from "pocketbase";

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

export type TaskPriority = "low" | "medium" | "high" | "urgent" | "none";

export class Task {
    public id: string;
    public title: string;
    public description: string;
    public dueDate: Date;
    public priority: TaskPriority;
    public created: Date;
    public updated: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        dueDate: Date,
        priority: TaskPriority,
        created: Date,
        updated: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.created = created;
        this.updated = updated;
    }

    public updateFromRecord(record: RecordModel): void {
        this.title = record.title;
        this.description = record.description;
        this.priority = record.priority as TaskPriority;
        this.dueDate = new Date(record.dueDate);
        this.updated = new Date(record.updated);
    }

    public static fromRecord(record: RecordModel): Task {
        return new Task(
            record.id,
            record.title,
            record.description,
            new Date(record.dueDate),
            record.priority as TaskPriority,
            new Date(record.created),
            new Date(record.updated)
        );
    }
}
