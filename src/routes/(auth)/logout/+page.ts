import { goto } from "$app/navigation";
import { pb } from "$services/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    pb.authStore.clear();

    const message = "Logged out successfully";
    goto(`/login?message=${encodeURIComponent(message)}`);
};
