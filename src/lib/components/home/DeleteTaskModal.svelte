<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { Backdrop, Modal } from "$ui/feedback";
    import { Button } from "$ui/forms";
    import type { Task } from "$models/index.svelte";

    interface Props {
        oncancel: () => void;
        ondelete: () => void;
        task: Task;
    }

    let { oncancel, ondelete, task }: Props = $props();

    let isProcessing = $state(false);

    const deleteTask = async () => {
        if (isProcessing) return;

        isProcessing = true;

        try {
            await pb.collection("tasks").delete(task.id);
        } catch (error) {
            console.error(error);
            isProcessing = false;
            return toastManager.error(
                (error as Error).message ?? "Something went wrong. Please try again later."
            );
        }

        isProcessing = false;
        toastManager.success("Task deleted successfully.");
        ondelete();
    };
</script>

<Backdrop close={oncancel} />
<Modal>
    <h2>Delete task {task.title} ?</h2>
    <p>This action cannot be undone.</p>
    <div class="relative flex w-full flex-col gap-5">
        <Button onclick={deleteTask} class="dark:bg-red-500 dark:text-white">
            {isProcessing ? "Deleting..." : "Delete"}
        </Button>
        <Button onclick={oncancel} class="border border-red-500 dark:bg-red-100 dark:text-red-500">
            Cancel
        </Button>
    </div>
</Modal>
