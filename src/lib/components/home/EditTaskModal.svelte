<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import DeleteTaskModal from "./DeleteTaskModal.svelte";
    import { Backdrop, Modal } from "$ui/feedback";
    import { Button, Input, Label, Select, TextArea } from "$ui/forms";
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconDeviceFloppy from "@tabler/icons-svelte/icons/device-floppy";
    import IconTrash from "@tabler/icons-svelte/icons/trash";
    import type { EventHandler } from "svelte/elements";
    import type { Reminder, Task, TaskPriority } from "$models/index.svelte";
    import RemindersHandler from "./RemindersHandler.svelte";

    interface Props {
        close: () => void;
        task: Task;
    }

    let { close, task }: Props = $props();

    let title = $state(task.title ?? "");
    let description = $state(task.description ?? "");
    let dueDate = $state(task.dueDate ? task.dueDate.toISOString().split("T")[0] : "");
    let dueTime = $state(
        task.dueDate
            ? task.dueDate.toISOString().split("T")[1].split(":").slice(0, 2).join(":")
            : ""
    );
    let priority = $state<TaskPriority>(task.priority ?? "none");
    let reminders = $state<Reminder[]>(task.reminders ?? []);

    let showDeleteModal = $state(false);
    let isProcessing = $state(false);
    let hasChanged = $derived.by(() => {
        return (
            title !== task.title ||
            description !== task.description ||
            dueDate !== task.dueDate?.toISOString().split("T")[0] ||
            dueTime !== task.dueDate?.toISOString().split("T")[1] ||
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

        if (dueTime && dueDate === "") {
            isProcessing = false;
            return toastManager.info("Please enter a due date if you want to set a due time.");
        }

        const finalDueDate = new Date(dueDate);

        if (dueTime) {
            const [hours, minutes] = dueTime.split(":");
            finalDueDate.setUTCHours(Number(hours), Number(minutes));
        }

        const data = {
            title: title.trim(),
            description: description.trim(),
            dueDate: finalDueDate,
            priority: priority ?? "none",
            reminders: reminders
        };

        try {
            await pb.collection("tasks").update(task.id, data);
        } catch (error) {
            console.error(error);
            isProcessing = false;
            return toastManager.error(
                (error as Error).message ?? "Something went wrong. Please try again later."
            );
        }

        isProcessing = false;
        close();
    };
</script>

<Backdrop {close} />
<Modal>
    <div class="relative flex w-full items-center justify-between">
        <div class="flex items-center gap-5">
            <Button onclick={close} class="grid h-10 place-items-center p-0 dark:bg-transparent">
                <IconX class="size-5 text-white" />
            </Button>
            <h2 class="text-xl font-semibold">Edit task</h2>
        </div>
        <div class="flex items-center gap-5">
            <Button
                onclick={() => (showDeleteModal = true)}
                class="grid aspect-square h-10 place-items-center p-0 dark:bg-red-500"
            >
                <IconTrash class="size-5 text-white" />
            </Button>
            <Button
                type="submit"
                form="edit-task-form"
                disabled={!hasChanged || isProcessing}
                class="grid aspect-square h-10 place-items-center p-0"
            >
                <IconDeviceFloppy class="size-5" />
            </Button>
        </div>
    </div>
    <form id="edit-task-form" {onsubmit} class="relative flex w-full flex-col gap-5">
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
        <div class="relative flex w-full gap-5">
            <Label.Root>
                <Label.Text for="dueDate">Due Date</Label.Text>
                <Input id="dueDate" name="dueDate" type="date" bind:value={dueDate} />
            </Label.Root>
            <Label.Root>
                <Label.Text for="dueTime">Due Time</Label.Text>
                <Input id="dueTime" name="dueTime" type="time" bind:value={dueTime} />
            </Label.Root>
        </div>
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
        <RemindersHandler bind:reminders />
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
