<script lang="ts">
    import { fade } from "svelte/transition";
    import { prefersReducedMotion } from "svelte/motion";
    import { Button, Input, Label, Select } from "$ui/forms";
    import { flyAndScale } from "$utils/transitions/fly-and-scale";
    import type { EventHandler } from "svelte/elements";
    import type { TaskPriority } from "$models";
    import { toastManager } from "$stores/toast/index.svelte";
    import { pb } from "$services/pocketbase";
    import { ClientResponseError } from "pocketbase";

    interface Props {
        close: () => void;
    }

    let { close }: Props = $props();

    let title = $state("");
    let description = $state("");
    let dueDate = $state(new Date().toISOString().split("T")[0]);
    let priority = $state<TaskPriority>("none");

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (title.trim() === "") {
            return toastManager.info("Please enter a valid title.");
        }

        const data = {
            title: title.trim(),
            description: description.trim(),
            dueDate,
            priority
        };

        try {
            await pb.collection("tasks").create(data);
        } catch (error) {
            console.error(error);
            const message =
                error instanceof ClientResponseError
                    ? error.message
                    : "Something went wrong. Please try again later.";
            return toastManager.error(message);
        }

        toastManager.success("Task created successfully.");
        close();
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    onclick={close}
    transition:fade={{ duration: prefersReducedMotion.current ? 0 : 150 }}
    class="fixed left-0 top-0 h-full w-full bg-black/20"
></div>
<article
    transition:flyAndScale={{ duration: prefersReducedMotion.current ? 0 : 150 }}
    class="fixed left-0 top-1/2 z-10 flex max-h-[80%] w-full -translate-y-1/2 flex-col gap-10 bg-zinc-900 p-5 shadow-2xl"
>
    <h2 class="text-xl font-semibold">Add a new task</h2>
    <form {onsubmit} class="relative flex w-full flex-col gap-5">
        <Label.Root>
            <Label.Text for="title">Title</Label.Text>
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
            <Input
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
        <Button type="submit">Add task</Button>
    </form>
</article>
