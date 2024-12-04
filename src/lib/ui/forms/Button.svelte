<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        class?: HTMLButtonAttributes["class"];
        /** Defaults to `type="button"`. */
        type?: HTMLButtonAttributes["type"];
    }

    let { children, class: className = undefined, type = "button", ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled button.
-->

<button
    {type}
    class={cn("relative rounded-full px-6 py-3 dark:bg-sky-400 dark:text-zinc-800", className)}
    {...restProps}
>
    {@render children?.()}
</button>
