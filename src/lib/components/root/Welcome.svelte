<script lang="ts">
    import { getUser } from "$contexts/user.svelte";
    import { pb } from "$services/pocketbase";
    import { toastManager } from "$stores/toast/index.svelte";
    import { Button, Input, Label } from "$ui/forms";
    import { ClientResponseError } from "pocketbase";
    import type { EventHandler } from "svelte/elements";

    const userContext = getUser();

    const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");

        if (!name) {
            return toastManager.info("Please enter a valid name.");
        }

        try {
            await pb.collection("users").update(userContext.user.id, { name: name.toString() });
        } catch (error) {
            console.error(error);
            const message =
                error instanceof ClientResponseError
                    ? error.message
                    : "Something went wrong. Please try again later.";
            return toastManager.error(message);
        }

        toastManager.success("Your name has been updated successfully.");
    };
</script>

<article
    class="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 bg-zinc-900 p-5"
>
    <h2 class="text-2xl font-semibold">Welcome to Selene</h2>
    <p>It looks like you don't have a name yet... let's get you one !</p>
    <form {onsubmit} class="relative flex w-full flex-col gap-5">
        <Label.Root>
            <Label.Text for="name">How do you want us to call you ?</Label.Text>
            <Input id="name" name="name" placeholder="My name is..." />
        </Label.Root>
        <Button type="submit">Save my name</Button>
    </form>
</article>
