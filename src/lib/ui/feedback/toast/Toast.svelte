<script lang="ts">
    import { fade } from "svelte/transition";
    import { COLOR_MAP, ICON_MAP } from "./defaults";
    import CloseIcon from "@tabler/icons-svelte/icons/x";
    import type { Snippet } from "svelte";
    import type { Toast } from "$stores/toast/index.svelte";

    interface Props {
        type: Toast['type'];
        ondismiss: () => void;
        children: Snippet;
    }

    let { children, ondismiss, type }: Props = $props();

    let Icon = $derived(ICON_MAP[type]);
    let color = $derived(COLOR_MAP[type]);
</script>

<!--
@component
A toast component to display a message with an icon and a close button.

Primarily used via the ToastManager (src/lib/stores/toast/index.svelte.js) API, which allows spawning toasts programmatically.
-->

<div
    role="alert"
    transition:fade
    class="relative flex items-center w-full gap-4 px-4 py-3 overflow-hidden bg-white border rounded-lg shadow-md border-zinc-200"
>
    <div style="background-color: {color}" class="absolute top-0 left-0 w-1 h-full"></div>
    <Icon style="color: {color}" class="min-h-6 min-w-6" />
    <p class="flex-grow text-sm">
        {@render children()}
    </p>
    <button class="bg-transparent border-none" onclick={ondismiss}>
        <CloseIcon class="size-6" />
    </button>
</div>
