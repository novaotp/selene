<script lang="ts">
    import { Button } from "$ui/forms";
</script>

<svelte:head>
    <title>Selene</title>
    <meta
        name="description"
        content="Selene makes it easy to manage your to-do list, so you can focus your time on what really matters."
    />
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-10 p-5">
    <h1 class="text-3xl font-semibold">Just task it</h1>
    <p>
        Selene makes it easy to manage your to-do list, so you can focus your time on what really
        matters.
    </p>
    <Button>Get started</Button>
</main>
