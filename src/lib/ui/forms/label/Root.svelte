<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;

    interface Props extends HTMLDivAttributes {
        children?: Snippet;
        class?: HTMLDivAttributes["class"];
    }

    let { children, class: className = undefined, ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled container for wrapping labels and form controls.
-->

<div
    class={cn("relative flex w-full flex-col items-start justify-center gap-[10px]", className)}
    {...restProps}
>
    {@render children?.()}
</div>
