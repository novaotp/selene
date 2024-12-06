<script lang="ts">
    import AddTaskModal from "$components/home/AddTaskModal.svelte";
    import { Skeleton } from "$ui/feedback";
    import { Button } from "$ui/forms";
    import IconPlus from "@tabler/icons-svelte/icons/plus";

    let { data } = $props();

    let showAddTaskModal = $state(false);
</script>

<svelte:head>
    <title>Home - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-10 p-5">
    <h1>Inbox</h1>
    {#await data.tasks}
        <Skeleton class="h-20 w-full" />
    {:then tasks}
        {#if tasks.length === 0}
            <p>You don't have any task.</p>
        {:else}
            <ul>
                {#each tasks as task}
                    <li>{task.title}</li>
                {/each}
            </ul>
        {/if}
    {:catch error}
        <p>An error occurred : {error.message}</p>
    {/await}
    <Button
        onclick={() => (showAddTaskModal = true)}
        class="absolute bottom-5 right-5 grid aspect-square w-[50px] place-items-center p-0"
    >
        <IconPlus />
    </Button>
</main>

{#if showAddTaskModal}
    <AddTaskModal />
{/if}
