import { v4 } from "uuid";

export type Toast = {
    id: string;
    type: "success" | "info" | "error";
    message: string;
};

/**
 * The number of milliseconds after which the toast is automatically dismissed.
 * @private **INTERNAL, ONLY EXPORTED FOR TESTING**
 */
export const _DISMISS_AFTER = 3000;

/** An API to spawn toast notifications programmatically. */
class ToastManager {
    /** The internal list of toasts notifications in the stack. */
    private _toasts: Toast[] = $state([]);

    /** The list of toasts notifications in the stack. */
    get toasts() {
        return this._toasts;
    }

    /**
     * Adds a new `success` toast to the top of the stack.
     * @param message The message of the toast.
     * @returns The ID of the newly created toast.
     */
    success(message: string): string {
        return this.addToast({ type: "success", message });
    }

    /**
     * Adds a new `info` toast to the top of the stack.
     * @param message The message of the toast.
     * @returns The ID of the newly created toast.
     */
    info(message: string): string {
        return this.addToast({ type: "info", message });
    }

    /**
     * Adds a new `error` toast to the top of the stack.
     * @param message The message of the toast.
     * @returns The ID of the newly created toast.
     */
    error(message: string): string {
        return this.addToast({ type: "error", message });
    }

    /**
     * Dismisses a toast from the stack.
     * @param id The ID of the toast to dismiss.
     */
    dismiss(id: string) {
        this._toasts = this._toasts.filter((toast) => toast.id !== id);
    }

    /**
     * Adds a new toast to the top of the stack.
     * @param data The data of the toast.
     * @returns The ID of the newly created toast.
     * @private
     */
    private addToast(data: Omit<Toast, "id">): string {
        const id = v4();

        this._toasts.push({ id, ...data });

        setTimeout(() => {
            this.dismiss(id);
        }, _DISMISS_AFTER);

        return id;
    }
}

export const toastManager = new ToastManager();
