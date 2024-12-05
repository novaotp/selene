<script lang="ts">
    import { fade } from "svelte/transition";
    import { cn } from "$utils/cn";
    import { TEXT_COLOR_MAP, ICON_MAP, BG_COLOR_MAP } from "./defaults";
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
</script>

<!--
@component
A toast component to display a message with an icon and a close button.

Primarily used via the ToastManager (src/lib/stores/toast/index.svelte.js) API, which allows spawning toasts programmatically.
-->

<div
    role="alert"
    transition:fade
    class={cn(
        "relative flex items-center w-full gap-4 px-4 py-3 overflow-hidden border rounded-lg shadow-md",
        "bg-white dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600"
    )}
>
    <div class="absolute top-0 left-0 w-1 h-full {BG_COLOR_MAP[type]}"></div>
    <Icon class="min-h-6 min-w-6 {TEXT_COLOR_MAP[type]}" />
    <p class="flex-grow text-sm">
        {@render children()}
    </p>
    <button class="bg-transparent border-none" onclick={ondismiss}>
        <CloseIcon class="size-6" />
    </button>
</div>
