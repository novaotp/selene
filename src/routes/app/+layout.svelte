<script lang="ts">
    import { setUser } from '$contexts/user.svelte.js';

    let { children, data } = $props();

    setUser(data.user)
</script>

{@render children()}
