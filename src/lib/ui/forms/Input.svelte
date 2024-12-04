<script lang="ts">
    import { cn } from "$utils/cn";
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {
        class?: HTMLInputAttributes["class"];
        value?: HTMLInputAttributes["value"];
    }

    let { class: className = undefined, value = $bindable(), ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled input.
-->

<input
    bind:value
    class={cn("relative h-[50px] w-full rounded-full px-5 text-sm dark:bg-zinc-800", className)}
    {...restProps}
/>
