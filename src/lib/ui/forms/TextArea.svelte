<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLTextareaAttributes } from "svelte/elements";

    interface Props extends HTMLTextareaAttributes {
        class?: HTMLTextareaAttributes["class"];
        value?: HTMLTextareaAttributes["value"];
    }

    let { class: className = undefined, value = $bindable(), ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled textarea.
-->

<textarea
    bind:value
    aria-multiline="true"
    class={cn(
        "relative h-40 w-full resize-none rounded-2xl p-5 text-sm dark:bg-zinc-800",
        className
    )}
    {...restProps}
></textarea>
