import { pb } from "$services/pocketbase";
import type { PageLoad } from "./$types";
import type { Task } from "$models";

export const load: PageLoad = async () => {
    return {
        tasks: pb.collection("tasks").getFullList<Task>({ sort: "-updated" })
    };
};
