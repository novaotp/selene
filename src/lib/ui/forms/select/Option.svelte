<script lang="ts">
    import { cn } from "$utils/cn";
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        class?: string;
        disabled?: boolean;
        selected?: boolean;
        value?: string;
    }

    let {
        children,
        class: className = undefined,
        disabled = false,
        selected = false,
        value = ""
    }: Props = $props();

    let buttonNode = $state<HTMLButtonElement>();
</script>

<!--
@component
A single entry in the select dropdown.

To make it the default value, use the `selected` property.

You can disable it using `disabled`.

Examples :
```svelte
<Select.Option>Low</Select.Option>

<Select.Option value="low">Low</Select.Option>

<Select.Option value="low" selected>Low</Select.Option>

<Select.Option selected disabled>Low</Select.Option>
```
-->

<li class="relative min-h-[50px] w-full">
    <button
        bind:this={buttonNode}
        type="button"
        role="option"
        tabindex="0"
        data-option-value={value}
        data-option-selected={selected}
        data-option-disabled={disabled}
        aria-selected={selected}
        class={cn(
            "relative flex min-h-[50px] w-full items-center justify-center gap-5 px-5 text-sm dark:bg-zinc-800",
            disabled ? "cursor-not-allowed dark:text-zinc-500" : "",
            className
        )}
    >
        {@render children?.()}
    </button>
</li>
