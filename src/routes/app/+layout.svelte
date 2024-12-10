<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { pb } from "$services/pocketbase";
    import { setUser } from "$contexts/user.svelte.js";
    import Welcome from "$components/root/Welcome.svelte";
    import Navigation from "$components/root/navigation/Navigation.svelte";

    let { children, data } = $props();

    const userContext = setUser(data.user);

    onMount(() => {
        const unsubscribe = pb.authStore.onChange((token, record) => {
            // The user disconnected
            if (!record) {
                return goto("/login");
            }

            userContext.user.updateFromRecord(record);
        }, true);

        return () => {
            unsubscribe();
        };
    });
</script>

<div class="relative flex h-full w-full flex-col">
    <Navigation />
    {@render children()}
</div>

{#if userContext.user.name === ""}
    <Welcome />
{/if}
