<script lang="ts">
    import { ClientResponseError } from "pocketbase";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { cn } from "$utils/cn";
    import EditTaskModal from "./EditTaskModal.svelte";
    import IconCircle from "@tabler/icons-svelte/icons/circle";
    import IconCircleCheckFilled from "@tabler/icons-svelte/icons/circle-check-filled";
    import IconCalendarEventFilled from "@tabler/icons-svelte/icons/calendar-event-filled";
    import IconFlag from "@tabler/icons-svelte/icons/flag";
    import IconPointFilled from "@tabler/icons-svelte/icons/point-filled";
    import type { Task } from "$models/index.svelte";
    import { Badge } from "$ui/data-display";

    interface Props {
        task: Task;
    }

    let { task }: Props = $props();

    let showEditModal = $state(false);

    const updateIsCompleted = async () => {
        try {
            await pb.collection("tasks").update(task.id, {
                isCompleted: !task.isCompleted
            });
        } catch (error) {
            console.error(error);
            const message =
                error instanceof ClientResponseError
                    ? error.message
                    : "Something went wrong. Please try again later.";
            return toastManager.error(message);
        }
    };
</script>

<div
    class={cn(
        "relative flex w-full items-start justify-start gap-5 py-5",
        task.isCompleted ? "opacity-50" : ""
    )}
>
    <button onclick={updateIsCompleted}>
        {#if task.isCompleted}
            <IconCircleCheckFilled class="size-7" />
        {:else}
            <IconCircle class="size-7" />
        {/if}
    </button>
    <button
        onclick={() => (showEditModal = true)}
        class="relative flex w-full flex-col items-start gap-[10px]"
    >
        <h2 class={task.isCompleted ? "line-through" : ""}>{task.title}</h2>
        {#if task.dueDate || task.priority !== "none"}
            <ul class="relative flex w-full flex-wrap items-center gap-1">
                {#if task.dueDate}
                    <div class="flex items-center gap-1 text-xs">
                        <IconCalendarEventFilled class="size-5" />
                        <time>
                            {task.dueDate.toLocaleDateString("fr-ch")}
                        </time>
                    </div>
                {/if}
                {#if task.priority !== "none"}
                    {#if task.dueDate}
                        <IconPointFilled class="size-3" />
                    {/if}
                    <Badge class="flex items-center gap-1 text-xs">
                        <IconFlag class="size-5" />
                        <span>{task.priority.at(0)?.toUpperCase() + task.priority.slice(1)}</span>
                    </Badge>
                {/if}
            </ul>
        {/if}
    </button>
</div>

{#if showEditModal}
    <EditTaskModal {task} close={() => (showEditModal = false)} />
{/if}
