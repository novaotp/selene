<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        class?: string;
    }

    let { children, class: className = undefined }: Props = $props();
</script>

<!--
@component
A small badge with rounded corners.

Change the color using the `className` property.
-->

<div class={cn("relative rounded-full px-3 py-1 text-sm", className)}>
    {@render children?.()}
</div>
