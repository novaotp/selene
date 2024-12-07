<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { pb } from "$services/pocketbase";
    import { Button, Input, Label, Select, TextArea } from "$ui/forms";
    import { Backdrop, Modal } from "$ui/feedback";
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconDeviceFloppy from "@tabler/icons-svelte/icons/device-floppy";
    import type { EventHandler } from "svelte/elements";
    import type { TaskPriority } from "$models/index.svelte";

    interface Props {
        close: () => void;
    }

    let { close }: Props = $props();

    let title = $state("");
    let description = $state("");
    let dueDate = $state("");
    let priority = $state<TaskPriority>("none");

    let isProcessing = $state(false);

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (isProcessing) return;

        isProcessing = true;

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
            await pb.collection("tasks").create(data);
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
        <div class="flex items-center gap-5">
            <Button onclick={close} class="grid h-10 place-items-center p-0 dark:bg-transparent">
                <IconX class="size-5 text-white" />
            </Button>
            <h2 class="text-xl font-semibold">Add task</h2>
        </div>
        <Button
            type="submit"
            form="add-task-form"
            onclick={close}
            disabled={!title.trim() || isProcessing}
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
    </form>
</Modal>
