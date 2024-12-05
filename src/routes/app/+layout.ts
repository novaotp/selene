import { pb } from "$services/pocketbase";
import { authGuard } from "$utils/auth";
import type { LayoutLoad } from "./$types";
import type { User } from "$models";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ url }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    url.pathname;

    const value = await authGuard(pb, (user) => {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                created: new Date(user.created),
                updated: new Date(user.updated)
            } satisfies User
        }
    });

    if (!value) {
        throw error(401, "Unauthorized action. Please log in to access the app.");
    }

    return {
        user: value!.user
    };
}
