<script lang="ts">
    import { ToastContainer } from "$ui/feedback";
    import "../app.css";

    let { children } = $props();
</script>

<ToastContainer />
{@render children()}
