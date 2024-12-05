<script lang="ts">
    import { getUser } from "$contexts/user.svelte";

    const userContext = getUser();
</script>

<h1>Hello {userContext.user.name || "Unknown"}</h1>
