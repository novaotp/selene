<script lang="ts">
    import { goto } from "$app/navigation";
    import { pb } from "$services/pocketbase";
    import { Button, Input, Label } from "$ui/forms";
    import { ClientResponseError } from "pocketbase";
    import type { EventHandler } from "svelte/elements";

    let isLoading = $state(false);
    let email = $state("");
    let password = $state("");

    const handleError = (message: string) => {
        isLoading = false;
        alert(message);
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
        goto("/app");
    };
</script>

<svelte:head>
    <title>Login - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-10 p-5">
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
        <Button type="submit">Log in</Button>
    </form>
</main>
