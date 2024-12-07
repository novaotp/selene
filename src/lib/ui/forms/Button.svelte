<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {
        children?: Snippet;
        class?: HTMLButtonAttributes["class"];
        disabled?: HTMLButtonAttributes["disabled"];
        /** Defaults to `type="button"`. */
        type?: HTMLButtonAttributes["type"];
    }

    let {
        children,
        class: className = undefined,
        type = "button",
        disabled = false,
        ...restProps
    }: Props = $props();
</script>

<!--
@component
A pre-styled button.
-->

<button
    {type}
    {disabled}
    aria-disabled={disabled}
    class={cn(
        "relative rounded-full px-6 py-[10px] dark:bg-sky-400 dark:text-zinc-800",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
    )}
    {...restProps}
>
    {@render children?.()}
</button>
