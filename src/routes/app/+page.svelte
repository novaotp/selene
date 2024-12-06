<script lang="ts">
    import AddTaskModal from "$components/home/AddTaskModal.svelte";
    import { pb } from "$services/pocketbase.js";
    import { Button } from "$ui/forms";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import { Task } from "$models";
    import { onMount } from "svelte";

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

            tasks = tasks.sort((a, b) => b.updated.getTime() - a.updated.getTime());
        });
    });
</script>

<svelte:head>
    <title>Home - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-10 p-5">
    <h1>Inbox</h1>
    {#if tasks.length === 0}
        <p>You don't have any task.</p>
    {:else}
        <ul>
            {#each tasks as task}
                <li>{task.title}</li>
            {/each}
        </ul>
    {/if}
    <Button
        onclick={() => (showAddTaskModal = true)}
        class="absolute bottom-5 right-5 grid aspect-square w-[50px] place-items-center p-0"
    >
        <IconPlus />
    </Button>
</main>

{#if showAddTaskModal}
    <AddTaskModal close={() => (showAddTaskModal = false)} />
{/if}
