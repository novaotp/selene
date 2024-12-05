import type { User } from "$models";
import { getContext, setContext } from "svelte";

const USER_KEY = Symbol("User");

export const getUser = (): User => {
    return getContext<User>(USER_KEY);
};

export const setUser = (user: User): User => {
    return setContext(USER_KEY, user);
};
