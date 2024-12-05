<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLAttributes } from "svelte/elements";

    interface Props extends HTMLAttributes<HTMLDivElement> {}

    let { class: className = undefined, ...restProps }: Props = $props();
</script>

<!--
@component
A placeholder component to display while the content is loading.
-->

<div class={cn("bg-zinc-800 animate-pulse rounded-lg", className)} {...restProps}></div>
