import type { User } from "$models/index.svelte";
import type { RecordModel } from "pocketbase";
import { getContext, setContext } from "svelte";

const USER_KEY = Symbol("User");

export const userFromRecord = (record: RecordModel): User => {
    return {
        id: record.id,
        name: record.name,
        email: record.email,
        created: new Date(record.created),
        updated: new Date(record.updated),
        avatar: record.avatar
    } satisfies User;
};

export const getUser = (): UserContext => {
    return getContext<UserContext>(USER_KEY);
};

export const setUser = (user: User): UserContext => {
    return setContext(USER_KEY, new UserContext(user));
};

class UserContext {
    user = $state<User>({} as User);

    constructor(user: User) {
        this.user = user;
    }
}
