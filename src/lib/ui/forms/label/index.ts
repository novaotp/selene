import Text from "./Text.svelte";
import Root from "./Root.svelte";

/**
 * @example
 * ```svelte
 * <Label.Root>
 *     <Label.Text for="name">Name</Label.Text>
 *     <Input id="name" placeholder="John Doe" />
 * </Label.Root>
 * ```
 */
export const Label = {
    /** A pre-styled label for form controls, intended to be used inside a {@link Root}. */
    Text,
    /** A pre-styled container for wrapping labels and form controls. */
    Root
};
