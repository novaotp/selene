import type { RecordModel } from "pocketbase";

export class User {
    public id: string = $state("");
    /** Is empty if not set. */
    public name: string = $state("");
    public email: string = $state("");
    /** Is empty if not set. */
    public avatar: string = $state("");
    public created: Date = $state(new Date());
    public updated: Date = $state(new Date());

    constructor(
        id: string,
        name: string,
        email: string,
        avatar: string,
        created: Date,
        updated: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.created = created;
        this.updated = updated;
    }

    public getInitials(): string {
        return this.name
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }

    public updateFromRecord(record: RecordModel): void {
        this.name = record.name;
        this.email = record.email;
        this.avatar = record.avatar;
        this.updated = new Date(record.updated);
    }

    public static fromRecord(record: RecordModel): User {
        return new User(
            record.id,
            record.name,
            record.email,
            record.avatar,
            new Date(record.created),
            new Date(record.updated)
        );
    }
}

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
