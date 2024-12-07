<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import IconTrash from "@tabler/icons-svelte/icons/trash";
    import DeleteTaskModal from "./DeleteTaskModal.svelte";
    import { Backdrop, Modal } from "$ui/feedback";
    import { Button, Input, Label, Select, TextArea } from "$ui/forms";
    import type { EventHandler } from "svelte/elements";
    import type { Task, TaskPriority } from "$models/index.svelte";

    interface Props {
        close: () => void;
        task: Task;
    }

    let { close, task }: Props = $props();

    let title = $state(task.title);
    let description = $state(task.description);
    let dueDate = $state(task.dueDate ? task.dueDate.toISOString().split("T")[0] : undefined);
    let priority = $state<TaskPriority>(task.priority);

    let showDeleteModal = $state(false);
    let isProcessing = $state(false);
    let hasChanged = $derived.by(() => {
        return (
            title !== task.title ||
            description !== task.description ||
            dueDate !== task.dueDate?.toISOString().split("T")[0] ||
            priority !== task.priority
        );
    });

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (isProcessing) return;

        isProcessing = true;

        if (!hasChanged) {
            isProcessing = false;
            return toastManager.info("Change a field to update the task.");
        }

        if (title.trim() === "") {
            isProcessing = false;
            return toastManager.info("Please enter a valid title.");
        }

        const data = {
            title: title.trim(),
            description: description.trim(),
            dueDate,
            priority: priority ?? "none"
        };

        try {
            await pb.collection("tasks").update(task.id, data);
        } catch (error) {
            console.error(error);
            isProcessing = false;
            const message =
                error instanceof ClientResponseError
                    ? error.message
                    : "Something went wrong. Please try again later.";
            return toastManager.error(message);
        }

        isProcessing = false;
        toastManager.success("Task created successfully.");
        close();
    };
</script>

<Backdrop {close} />
<Modal>
    <div class="relative flex w-full items-center justify-between">
        <h2 class="text-xl font-semibold">Edit task</h2>
        <Button
            onclick={() => (showDeleteModal = true)}
            class="grid aspect-square h-10 place-items-center p-0 dark:bg-red-500"
        >
            <IconTrash class="size-5 text-white" />
        </Button>
    </div>
    <form {onsubmit} class="relative flex w-full flex-col gap-5">
        <Label.Root>
            <Label.Text for="title">Title *</Label.Text>
            <Input
                id="title"
                name="title"
                placeholder="Enter a title..."
                bind:value={title}
                required
            />
        </Label.Root>
        <Label.Root>
            <Label.Text for="description">Description</Label.Text>
            <TextArea
                id="description"
                name="description"
                placeholder="Enter a description..."
                bind:value={description}
            />
        </Label.Root>
        <Label.Root>
            <Label.Text for="deadline">Due Date</Label.Text>
            <Input id="dueDate" name="dueDate" type="date" bind:value={dueDate} />
        </Label.Root>
        <Label.Root>
            <Label.Text for="priority">Priority</Label.Text>
            <Select.Root id="priority" name="priority" bind:value={priority}>
                <Select.Option value="none" selected>None</Select.Option>
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
                <Select.Option value="urgent">Urgent</Select.Option>
            </Select.Root>
        </Label.Root>
        <Button type="submit" disabled={!hasChanged}>
            {isProcessing ? "Processing..." : "Update"}
        </Button>
    </form>
</Modal>

{#if showDeleteModal}
    <DeleteTaskModal
        {task}
        oncancel={() => (showDeleteModal = false)}
        ondelete={() => {
            showDeleteModal = false;
            close();
        }}
    />
{/if}
