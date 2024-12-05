import type { ComponentType } from "svelte";
import type { Toast } from "$stores/toast/index.svelte";
import IconCircleCheckFilled from "@tabler/icons-svelte/icons/circle-check-filled";
import IconExclamationCircleFilled from "@tabler/icons-svelte/icons/exclamation-circle-filled";
import InfoIconFilled from "@tabler/icons-svelte/icons/info-circle-filled";

export const ICON_MAP: Record<Toast["type"], ComponentType> = {
    success: IconCircleCheckFilled,
    info: InfoIconFilled,
    error: IconExclamationCircleFilled
};

export const COLOR_MAP: Record<Toast["type"], string> = {
    success: "#16a34a",
    info: "#3b82f6",
    error: "#ef4444"
};
