<script lang="ts">
    import { prefersReducedMotion } from "svelte/motion";
    import { flyAndScale } from "$utils/transitions/fly-and-scale";
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
A centered-dialog that interupts the flow of the page, used alongside backdrops.
-->

<article
    transition:flyAndScale={{ duration: prefersReducedMotion.current ? 0 : 150 }}
    class={cn(
        "fixed left-0 top-1/2 z-10 flex max-h-[85%] w-full -translate-y-1/2",
        "flex-col gap-10 overflow-auto bg-zinc-900 p-5 shadow-2xl",
        className
    )}
>
    {@render children?.()}
</article>
