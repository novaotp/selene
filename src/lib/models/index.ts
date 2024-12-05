export type User = {
    id: string;
    /** Is empty if not set. */
    name: string;
    email: string;
    created: Date;
    updated: Date;
    /** Is empty if not set. */
    avatar: string;
}
