<script lang="ts">
    /**
     * TODO : Make it more accessible
     */

    import { onMount, type Snippet } from "svelte";
    import { slide } from "svelte/transition";
    import { cn } from "$utils/cn";
    import { prefersReducedMotion } from "svelte/motion";

    interface Props {
        id?: string;
        isOpen?: boolean;
        children?: Snippet;
        class?: string;
        name?: string;
        onchange?: (value: string) => void;
        value?: string;
    }

    let {
        id,
        isOpen = $bindable(false),
        children,
        class: className = undefined,
        name,
        onchange = () => {},
        value = $bindable()
    }: Props = $props();

    let masterNode = $state<HTMLDivElement>();
    let triggerButtonNode = $state<HTMLButtonElement>();
    let hiddenOptionsDivNode = $state<HTMLDivElement>();
    let optionsUListNode = $state<HTMLUListElement>();

    let textShown = $state("");
    let screenHeight = $state(0);

    const isBelowHalfOfScreen = (): boolean => {
        if (!document.body || !masterNode) return false;

        const masterTop = masterNode.getBoundingClientRect().top;

        return masterTop > screenHeight / 2;
    };

    onMount(() => {
        const onOutsideClick = (event: MouseEvent) => {
            if (event.target === triggerButtonNode) {
                isOpen = !isOpen;
                return;
            }

            const target = event.target! as HTMLElement;

            // ul
            // |-- li
            //     |-- button    <- target
            if (
                !(target instanceof HTMLButtonElement) ||
                target.parentElement?.parentElement !== optionsUListNode ||
                !target.hasAttribute("data-option-value")
            ) {
                isOpen = false;
                return;
            }

            if (
                target.hasAttribute("data-option-disabled") &&
                target.getAttribute("data-option-disabled") === "true"
            ) {
                return;
            }

            value = target.getAttribute("data-option-value")!;
            textShown = target.textContent!;
            isOpen = false;
            onchange(value);
        };

        document.addEventListener("click", onOutsideClick);

        return () => {
            document.removeEventListener("click", onOutsideClick);
        };
    });

    onMount(() => {
        if (!hiddenOptionsDivNode) return;

        const selectedElement = Array.from(hiddenOptionsDivNode.children).find((child) => {
            return (
                child.firstElementChild &&
                child.firstElementChild.hasAttribute("data-option-selected")
            );
        });

        if (!selectedElement) return;

        value = selectedElement.firstElementChild!.getAttribute("data-option-value")!;
        textShown = selectedElement.firstElementChild!.textContent!;
        onchange(value);
    });
</script>

<svelte:window bind:innerHeight={screenHeight} />

<!--
@component
The root element for a select dropdown.

If you are using the `select` in a form, you can set the `name` property to access the select's value inside the `FormData` object.

Example :
```svelte
<Select.Root name="my-select">
    <Select.Option value="low">Low</Select.Option>
    <Select.Option value="medium">Medium</Select.Option>
    <Select.Option value="high">High</Select.Option>
</Select.Root>
```
-->

<div bind:this={masterNode} class={cn("relative w-full", className)}>
    <input {id} {name} {value} type="hidden" />
    <button
        bind:this={triggerButtonNode}
        role="combobox"
        type="button"
        tabindex="0"
        aria-controls="listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        class="relative h-[50px] w-full cursor-pointer rounded-2xl text-sm dark:bg-zinc-800"
        data-select-value={value}
    >
        {textShown}
    </button>
    <div>
        <div bind:this={hiddenOptionsDivNode} class="hidden">
            <!-- Access the selected property's value. -->
            {@render children?.()}
        </div>
        {#if isOpen}
            <ul
                bind:this={optionsUListNode}
                transition:slide={{ duration: prefersReducedMotion.current ? 0 : 150 }}
                role="listbox"
                aria-expanded={isOpen}
                class={cn(
                    "absolute flex w-full overflow-hidden rounded-2xl shadow-[0_0_4px_8px_rgb(0,0,0,0.1)]",
                    isBelowHalfOfScreen() ? "bottom-[60px] flex-col-reverse" : "top-[60px] flex-col"
                )}
            >
                {@render children?.()}
            </ul>
        {/if}
    </div>
</div>
