<script lang="ts">
    /**
     * TODO : Make it more accessible
     */

    import { cn } from "$utils/cn";
    import { onMount, type Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        id?: string;
        isOpen?: boolean;
        name?: string;
        onchange?: (value: string) => void;
        value?: string;
    }

    let {
        id,
        children,
        isOpen = $bindable(false),
        name,
        onchange = () => {},
        value = $bindable("")
    }: Props = $props();

    let buttonNode = $state<HTMLButtonElement>();
    let ulNode = $state<HTMLUListElement>();

    let textShown = $state("");

    onMount(() => {
        const onOutsideClick = (event: MouseEvent) => {
            if (event.target === buttonNode) {
                isOpen = !isOpen;
                return;
            }

            const target = event.target! as HTMLElement;

            // ul
            // |-- li
            //     |-- button    <- target
            if (
                !(target instanceof HTMLButtonElement) ||
                target.parentElement?.parentElement !== ulNode ||
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
        if (!ulNode) return;

        const selectedElement = Array.from(ulNode.children).find((child) => {
            return (
                child.firstElementChild &&
                child.firstElementChild.hasAttribute("data-option-selected")
            );
        });

        if (!selectedElement) return;

        value = selectedElement.getAttribute("data-option-value")!;
        textShown = selectedElement.textContent!;
        onchange(value);
    });
</script>

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

<input {id} {name} {value} type="hidden" />
<button
    bind:this={buttonNode}
    role="combobox"
    tabindex="0"
    aria-controls="listbox"
    aria-expanded={isOpen}
    class="relative h-[50px] w-full cursor-pointer rounded-full dark:bg-zinc-800"
    data-select-value={value}
>
    {textShown}
</button>
<ul
    bind:this={ulNode}
    role="listbox"
    aria-expanded={isOpen}
    class={cn(
        "relative flex w-full flex-col divide-y overflow-hidden dark:divide-zinc-700",
        isOpen ? "flex" : "hidden",
        ulNode && ulNode.getElementsByTagName("*").length > 1 ? "rounded-3xl" : "rounded-full"
    )}
>
    {@render children?.()}
</ul>
