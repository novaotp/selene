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
    public id: string = $state("");
    public title: string = $state("");
    public description: string = $state("");
    public isCompleted: boolean = $state(false);
    public dueDate: Date | undefined = $state(undefined);
    public priority: TaskPriority = $state("none");
    public created: Date = $state(new Date());
    public updated: Date = $state(new Date());

    constructor(
        id: string,
        title: string,
        description: string,
        isCompleted: boolean,
        dueDate: Date | undefined,
        priority: TaskPriority,
        created: Date,
        updated: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.dueDate = dueDate;
        this.priority = priority;
        this.created = created;
        this.updated = updated;
    }

    public updateFromRecord(record: RecordModel): void {
        this.title = record.title;
        this.description = record.description;
        this.isCompleted = record.isCompleted;
        this.priority = record.priority as TaskPriority;
        this.dueDate = record.dueDate ? new Date(record.dueDate) : undefined;
        this.updated = new Date(record.updated);
    }

    public static fromRecord(record: RecordModel): Task {
        return new Task(
            record.id,
            record.title,
            record.description,
            record.isCompleted,
            record.dueDate ? new Date(record.dueDate) : undefined,
            record.priority as TaskPriority,
            new Date(record.created),
            new Date(record.updated)
        );
    }
}
