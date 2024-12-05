<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { Banner } from "$ui/feedback";
    import { Button, Input, Label } from "$ui/forms";
    import { ClientResponseError } from "pocketbase";
    import type { EventHandler } from "svelte/elements";

    let isLoading = $state(false);
    let email = $state("");
    let password = $state("");

    const handleError = (message: string) => {
        isLoading = false;
        toastManager.error(message);
        password = "";
    };

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        isLoading = true;

        if (!email || !password) {
            return handleError("All fields are required.");
        }

        try {
            await pb.collection("users").authWithPassword(email, password);
        } catch (error) {
            if (error instanceof ClientResponseError) {
                return handleError(error.message);
            }

            return handleError("Internal server error.");
        }

        isLoading = false;
        toastManager.success("Logged in successfully.");
        goto("/app");
    };
</script>

<svelte:head>
    <title>Login - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-10 p-5">
    {#if $page.url.searchParams.has("message")}
        {#if $page.url.searchParams.has("success")}
            <Banner type="success">{$page.url.searchParams.get("message")}</Banner>
        {:else if $page.url.searchParams.has("warning")}
            <Banner type="warning">{$page.url.searchParams.get("message")}</Banner>
        {:else if $page.url.searchParams.has("info")}
            <Banner type="info">{$page.url.searchParams.get("message")}</Banner>
        {:else if $page.url.searchParams.has("error")}
            <Banner type="error">{$page.url.searchParams.get("message")}</Banner>
        {/if}
    {/if}
    <h1 class="text-3xl font-semibold">Login</h1>
    <form {onsubmit} class="relative flex w-full flex-col items-center justify-center gap-5">
        <Label.Root>
            <Label.Text for="email">Email</Label.Text>
            <Input
                bind:value={email}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email..."
            />
        </Label.Root>
        <Label.Root>
            <Label.Text for="password">Password</Label.Text>
            <Input
                bind:value={password}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password..."
            />
        </Label.Root>
        <Button type="submit" disabled={isLoading}>Log in</Button>
    </form>
</main>
