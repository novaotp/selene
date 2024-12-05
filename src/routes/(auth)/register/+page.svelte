<script lang="ts">
    import { goto } from "$app/navigation";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { Button, Input, Label } from "$ui/forms";
    import { ClientResponseError } from "pocketbase";
    import type { EventHandler } from "svelte/elements";

    let isLoading = $state(false);
    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    const handleError = (message: string) => {
        isLoading = false;
        toastManager.error(message);
        password = "";
        confirmPassword = "";
    };

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        isLoading = true;

        if (!email || !password || !confirmPassword) {
            return handleError("All fields are required.");
        }

        if (password.length < 8) {
            return handleError("Password must be at least 8 characters long.");
        }

        if (password !== confirmPassword) {
            return handleError("Passwords do not match.");
        }

        const data = {
            email,
            emailVisibility: true,
            password,
            passwordConfirm: confirmPassword
        };

        try {
            await pb.collection("users").create(data);
            await pb.collection("users").authWithPassword(email, password);
        } catch (error) {
            if (error instanceof ClientResponseError) {
                return handleError(error.message);
            }

            return handleError("Internal server error.");
        }

        isLoading = false;
        toastManager.success("Registered account successfully.");
        goto("/app");
    };
</script>

<svelte:head>
    <title>Register - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-10 p-5">
    <h1 class="text-3xl font-semibold">Register</h1>
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
            <p class="text-sm text-zinc-500">Must be at least 8 characters long.</p>
        </Label.Root>
        <Label.Root>
            <Label.Text for="confirmPassword">Confirm password</Label.Text>
            <Input
                bind:value={confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again..."
            />
        </Label.Root>
        <Button type="submit">Register</Button>
    </form>
</main>
