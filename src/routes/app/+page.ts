import { pb } from "$services/pocketbase";
import { Task } from "$models";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    return {
        tasks: await pb
            .collection("tasks")
            .getFullList({ sort: "-updated" })
            .then((tasks) => tasks.map(Task.fromRecord))
    };
};
