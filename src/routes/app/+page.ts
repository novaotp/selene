import { pb } from "$services/pocketbase";
import { Task } from "$models/index.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart.getTime());
    todayEnd.setHours(23, 59, 59, 999);

    return {
        tasks: await pb
            .collection("tasks")
            .getFullList({
                filter: `dueDate >= '${todayStart.toISOString().replace("T", " ")}' && dueDate <= '${todayEnd.toISOString().replace("T", " ")}'`,
                sort: "-created"
            })
            .then((tasks) => tasks.map((t) => Task.fromRecord(t)))
    };
};
