<script lang="ts">
    import { cn } from "$utils/cn";
    import { prefersReducedMotion } from "svelte/motion";
    import { fade } from "svelte/transition";

    interface Props {
        class?: string;
        close?: () => void;
    }

    let { class: className = undefined, close }: Props = $props();
</script>

<!--
@component
A dimmed layer to use alongside modals.

The `close` property is called when the backdrop is clicked. It can be used to close the modal.

@example
```svelte
<Backdrop close={closeModal} />
```
-->

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    onclick={close}
    transition:fade={{ duration: prefersReducedMotion.current ? 0 : 150 }}
    class={cn("fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-[2px]", className)}
></div>
