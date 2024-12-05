<script lang="ts">
    import { getUser } from "$contexts/user.svelte";

    const user = getUser();
</script>

<h1>Hello {user.name || "Unknown"}</h1>
