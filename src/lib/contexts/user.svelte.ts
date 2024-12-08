import { getContext, setContext } from "svelte";
import type { User } from "$models/index.svelte";

const USER_KEY = Symbol("User");

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
