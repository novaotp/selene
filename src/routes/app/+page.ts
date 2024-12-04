import { pb } from "$services/pocketbase";
import { authGuard } from "$utils/auth";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    await authGuard(pb);
};
