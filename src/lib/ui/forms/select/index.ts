import Root from "./Root.svelte";
import Option from "./Option.svelte";

export const Select = {
    /**
     * The root element for a select dropdown.
     *
     * If you are using the `select` in a form, you can set the `name` property to access the select's value inside the `FormData` object.
     *
     * Example :
     * ```svelte
     * <Select.Root name="my-select">
     *     <Select.Option value="low">Low</Select.Option>
     *     <Select.Option value="medium">Medium</Select.Option>
     *     <Select.Option value="high">High</Select.Option>
     * </Select.Root>
     * ```
     */
    Root,
    /**
     * A single entry in the select dropdown.
     *
     * To make it the default value, use the `selected` property. Note that only the first option with this property will be selected.
     *
     * You can disable (make it unselectable) it using `disabled`.
     *
     * Examples :
     * ```svelte
     * <Select.Option>Low</Select.Option>
     *
     * <Select.Option value="low">Low</Select.Option>
     *
     * <Select.Option value="low" selected>Low</Select.Option>
     *
     * <Select.Option selected disabled>Low</Select.Option>
     * ```
     */
    Option
};
