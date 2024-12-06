<script lang="ts">
    import { setUser, userFromRecord } from "$contexts/user.svelte.js";
    import Welcome from "$components/root/Welcome.svelte";
    import { pb } from "$services/pocketbase";
    import { onMount } from "svelte";

    let { children, data } = $props();

    const userContext = setUser(data.user);

    onMount(() => {
        const unsubscribe = pb.authStore.onChange((token, record) => {
            userContext.user = userFromRecord(record!);
        }, true);

        return () => {
            unsubscribe();
        };
    });
</script>

{@render children()}

{#if userContext.user.name === ""}
    <Welcome />
{/if}
