<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        isOpen?: boolean;
        placeholder?: string;
        value?: string;
    }

    let { children, isOpen = false, placeholder = "", value = $bindable() }: Props = $props();
</script>

<!--
@component
The root element for a select dropdown.
-->

<button role="combobox" tabindex="0" aria-controls="listbox" aria-expanded={isOpen}>
    {placeholder}
</button>
<ul role="listbox" aria-expanded={isOpen}>
    {@render children?.()}
</ul>
