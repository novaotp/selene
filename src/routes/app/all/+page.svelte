<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { pb } from "$services/pocketbase.js";
    import { Task } from "$models/index.svelte.js";
    import { Button } from "$ui/forms";
    import AddTaskModal from "$components/home/AddTaskModal.svelte";
    import TaskCard from "$components/home/TaskCard.svelte";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import IconChecklist from "@tabler/icons-svelte/icons/checklist";

    let { data } = $props();

    let tasks = $state<Task[]>(data.tasks);
    let showAddTaskModal = $state(false);

    onMount(async () => {
        await pb.collection("tasks").subscribe("*", (event) => {
            if (event.action === "create") {
                tasks.push(Task.fromRecord(event.record));
            } else if (event.action === "update") {
                tasks.find((t) => t.id === event.record.id)!.updateFromRecord(event.record);
            } else if (event.action === "delete") {
                tasks = tasks.filter((t) => t.id !== event.record.id);
            }

            tasks = tasks.sort((a, b) => b.created.getTime() - a.created.getTime());
        });
    });
</script>

<svelte:head>
    <title>Home - {PUBLIC_APP_NAME}</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-5 p-5 pt-0">
    <h1>Inbox</h1>
    {#if tasks.length === 0}
        <div class="relative my-auto flex w-full flex-col items-center justify-center gap-10 pb-20">
            <IconChecklist class="size-20" />
            <p class="text-center">It looks like you have completed everything. Congrats !</p>
            <p class="text-center text-xs">Or you haven't set any tasks...</p>
        </div>
    {:else}
        <ul class="relative flex w-full flex-col divide-y divide-zinc-700 pb-[50px]">
            {#each tasks.filter((t) => !t.isCompleted) as task (task.id)}
                <TaskCard {task} />
            {/each}
            {#each tasks.filter((t) => t.isCompleted) as task (task.id)}
                <TaskCard {task} />
            {/each}
        </ul>
    {/if}
    <Button
        onclick={() => (showAddTaskModal = true)}
        class="fixed bottom-5 right-5 grid aspect-square w-[50px] place-items-center p-0 shadow-lg"
    >
        <IconPlus />
    </Button>
</main>

{#if showAddTaskModal}
    <AddTaskModal close={() => (showAddTaskModal = false)} />
{/if}
