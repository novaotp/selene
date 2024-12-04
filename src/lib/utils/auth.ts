import { goto } from "$app/navigation";
import PocketBase from "pocketbase";

type AuthGuardCallbackReturnType<T> = T | void;
type AuthGuardCallback<T> = () =>
    | AuthGuardCallbackReturnType<T>
    | Promise<AuthGuardCallbackReturnType<T>>;

/**
 * An auth guard to check if the user is authenticated and redirect to the login page if not.
 * @param client A {@link PocketBase} instance.
 * @param callback An optional callback function to execute if the user is authenticated.
 * @returns The result of the callback function, or `undefined` if the user is not authenticated.
 */
export const authGuard = async <T>(
    client: PocketBase,
    callback: AuthGuardCallback<T> = () => {}
) => {
    if (!client.authStore.isValid) {
        const message = "Please log in first to access the app.";
        goto(`/login?${encodeURIComponent(message)}`);
        return;
    }

    return await callback();
};