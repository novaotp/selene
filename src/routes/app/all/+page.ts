import { pb } from "$services/pocketbase";
import { Task } from "$models/index.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
    const parentData = await parent();

    return {
        tasks: await pb
            .collection("tasks")
            .getFullList({ filter: `userId = '${parentData.user.id}'`, sort: "-created" })
            .then((tasks) => tasks.map((t) => Task.fromRecord(t)))
    };
};
