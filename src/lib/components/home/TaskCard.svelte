<script lang="ts">
    import type { Task, TaskPriority } from "$models/index.svelte";
    import { Badge } from "$ui/data-display";
    import EditTaskModal from "./EditTaskModal.svelte";

    interface Props {
        task: Task;
    }

    let { task }: Props = $props();

    const taskPriorityColors: Record<TaskPriority, string> = {
        none: "dark:bg-zinc-800 dark:text-zinc-800",
        low: "dark:bg-sky-400 dark:text-zinc-800",
        medium: "dark:bg-amber-400 dark:text-zinc-800",
        high: "dark:bg-rose-400 dark:text-zinc-800",
        urgent: "dark:bg-red-400 dark:text-zinc-800"
    };

    let showEditModal = $state(false);

    $effect(() => {
        console.log(task);
    });
</script>

<button
    onclick={() => (showEditModal = true)}
    class="relative flex w-full flex-col items-start justify-start gap-2 rounded-2xl bg-zinc-800 p-5"
>
    {#if task.dueDate || task.priority !== "none"}
        <ul class="relative flex w-full flex-wrap gap-[10px]">
            {#if task.dueDate}
                <Badge class="dark:bg-sky-400 dark:text-zinc-800">
                    <time>
                        {task.dueDate.toLocaleDateString("fr-ch")}
                    </time>
                </Badge>
            {/if}
            {#if task.priority !== "none"}
                <Badge class={taskPriorityColors[task.priority]}>
                    {task.priority.at(0)?.toUpperCase() + task.priority.slice(1)}
                </Badge>
            {/if}
        </ul>
    {/if}
    <h2>{task.title}</h2>
    {#if task.description}
        <p class="text-sm">{task.description}</p>
    {/if}
</button>

{#if showEditModal}
    <EditTaskModal {task} close={() => (showEditModal = false)} />
{/if}
