<script lang="ts">
    import { pb } from "$services/pocketbase";
</script>

<h1>Hello {pb.authStore.record!.name || "Unknown"}</h1>
