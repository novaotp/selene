<script lang="ts">
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { Button, Input, Label, Select, TextArea } from "$ui/forms";
    import { Backdrop, Modal } from "$ui/feedback";
    import RemindersHandler from "./RemindersHandler.svelte";
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconDeviceFloppy from "@tabler/icons-svelte/icons/device-floppy";
    import IconPointFilled from "@tabler/icons-svelte/icons/point-filled";
    import type { EventHandler } from "svelte/elements";
    import type { Reminder, TaskPriority } from "$models/index.svelte";

    interface Props {
        close: () => void;
    }

    let { close }: Props = $props();

    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
    let dueTime = $state("");
    let priority = $state<TaskPriority>("none");
    let reminders = $state<Reminder[]>([]);

    let isProcessing = $state(false);

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (isProcessing) return;

        isProcessing = true;

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
            priority: priority ?? "none"
        };

        try {
            await pb.collection("tasks").create(data);
        } catch (error) {
            console.error(error);
            return toastManager.error(
                (error as Error).message ?? "Something went wrong. Please try again later."
            );
        }

        isProcessing = false;
        toastManager.success("Task created successfully.");
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
            <h2 class="text-xl font-semibold">Add task</h2>
        </div>
        <Button
            type="submit"
            form="add-task-form"
            disabled={isProcessing}
            class="grid aspect-square h-10 place-items-center p-0"
        >
            <IconDeviceFloppy class="size-5" />
        </Button>
    </div>
    <form id="add-task-form" {onsubmit} class="relative flex w-full flex-col gap-5">
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
                <Select.Option value="none" selected>
                    <IconPointFilled class="size-7 text-white" />
                    <span class="w-full">None</span>
                </Select.Option>
                <Select.Option value="low">
                    <IconPointFilled class="size-7 text-green-500" />
                    <span class="w-full">Low</span>
                </Select.Option>
                <Select.Option value="medium">
                    <IconPointFilled class="size-7 text-indigo-500" />
                    <span class="w-full">Medium</span>
                </Select.Option>
                <Select.Option value="high">
                    <IconPointFilled class="size-7 text-yellow-500" />
                    <span class="w-full">High</span>
                </Select.Option>
                <Select.Option value="urgent">
                    <IconPointFilled class="size-7 text-red-500" />
                    <span class="w-full">Urgent</span>
                </Select.Option>
            </Select.Root>
        </Label.Root>
        <RemindersHandler bind:reminders />
    </form>
</Modal>
