<script lang="ts">
    import type { Task, TaskPriority } from "$models";
    import { Badge } from "$ui/data-display";

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
</script>

<div class="flex flex-col gap-2 rounded-2xl bg-zinc-800 p-5">
    <ul class="relative flex w-full flex-wrap gap-[10px]">
        {#if task.dueDate}
            <Badge class="dark:bg-sky-400 dark:text-zinc-800">
                <time datetime={task.dueDate.toISOString()}>
                    {task.dueDate.toLocaleDateString("fr-ch")}
                </time>
            </Badge>
        {/if}
        {#if task.priority !== "none"}
            <Badge class={taskPriorityColors[task.priority]}>
                {task.priority}
            </Badge>
        {/if}
    </ul>
    <h2>{task.title}</h2>
    {#if task.description}
        <p class="text-sm">{task.description}</p>
    {/if}
</div>
