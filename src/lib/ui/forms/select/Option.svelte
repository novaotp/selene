<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        disabled?: boolean;
        selected?: boolean;
        value?: string;
    }

    let { children, disabled = false, selected = false, value = "" }: Props = $props();

    let buttonNode = $state<HTMLButtonElement>();
</script>

<!--
@component
A single entry in the select dropdown.

To make it the default value, use the `selected` property.

You can disable it using `disabled`.

Examples :
```svelte
<Select.Option value="low">Low</Select.Option>

<Select.Option value="low" selected>Low</Select.Option>

<Select.Option selected disabled>Low</Select.Option>
```
-->

<li class="relative h-[50px] w-full">
    <button
        bind:this={buttonNode}
        role="option"
        tabindex="0"
        data-option-value={value}
        data-option-selected={selected}
        data-option-disabled={disabled}
        aria-selected={selected}
        class={cn(
            "relative h-full w-full dark:bg-zinc-800",
            disabled ? "cursor-not-allowed dark:text-zinc-500" : ""
        )}
    >
        {@render children?.()}
    </button>
</li>
