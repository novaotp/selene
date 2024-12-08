import { error } from "@sveltejs/kit";
import { pb } from "$services/pocketbase";
import { User } from "$models/index.svelte";
import { authGuard } from "$utils/auth";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    url.pathname;

    const user = await authGuard(pb, (user) => User.fromRecord(user));

    if (!user) {
        throw error(401, "Unauthorized action. Please log in to access the app.");
    }

    return { user };
};
