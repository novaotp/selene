<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { pb } from "$services/pocketbase";
    import { Button, Input, Label, Select, TextArea } from "$ui/forms";
    import { Backdrop, Modal } from "$ui/feedback";
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
    <h2 class="text-xl font-semibold">Add a new task</h2>
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
        <Button type="submit" disabled={title.trim() === ""}>
            {isProcessing ? "Processing..." : "Save"}
        </Button>
    </form>
</Modal>
