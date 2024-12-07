import { pb } from "$services/pocketbase";
import { Task } from "$models/index.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    return {
        tasks: await pb
            .collection("tasks")
            .getFullList({ sort: "-created" })
            .then((tasks) => tasks.map((t) => Task.fromRecord(t)))
    };
};
