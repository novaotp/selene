<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        disabled?: boolean;
        selected?: boolean;
        value?: string;
    }

    let { children, disabled = false, selected = false, value = "" }: Props = $props();
</script>

<li role="option" aria-selected={selected}>
    {@render children?.()}
</li>
