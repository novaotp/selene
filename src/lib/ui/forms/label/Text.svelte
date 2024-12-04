<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLLabelAttributes } from "svelte/elements";

    interface Props extends HTMLLabelAttributes {
        children?: Snippet;
        class?: HTMLLabelAttributes["class"];
        for?: HTMLLabelAttributes["for"];
    }

    let {
        children,
        class: className = undefined,
        for: htmlFor = undefined,
        ...restProps
    }: Props = $props();
</script>

<!--
@component
A pre-styled label for form controls, intended to be used inside a [Root].
-->

<label class={className} for={htmlFor} {...restProps}>
    {@render children?.()}
</label>
