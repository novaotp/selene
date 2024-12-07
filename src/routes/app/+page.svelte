<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { pb } from "$services/pocketbase.js";
    import { Task } from "$models/index.svelte.js";
    import { Button } from "$ui/forms";
    import AddTaskModal from "$components/home/AddTaskModal.svelte";
    import TaskCard from "$components/home/TaskCard.svelte";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import type { UnsubscribeFunc } from "pocketbase";

    let { data } = $props();

    let tasks = $state<Task[]>(data.tasks);
    let showAddTaskModal = $state(false);

    let taskUnsubscribe: UnsubscribeFunc;

    onMount(async () => {
        taskUnsubscribe = await pb.collection("tasks").subscribe("*", (event) => {
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

    onDestroy(async () => {
        await taskUnsubscribe();
    });
</script>

<svelte:head>
    <title>Home - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-5 p-5 pt-0">
    <h1>Inbox</h1>
    {#if tasks.length === 0}
        <p>You don't have any task.</p>
    {:else}
        <ul class="relative flex w-full flex-col divide-y divide-zinc-700 pb-[50px]">
            {#each tasks as task}
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
