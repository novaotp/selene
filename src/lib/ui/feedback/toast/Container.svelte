<script lang="ts">
    import { toastManager } from "$stores/toast/index.svelte";
    import Toast from "./Toast.svelte";
</script>

<div
    class="fixed bottom-5 right-5 w-[calc(100%-40px)] sm:w-auto md:max-w-[480px] flex flex-col justify-center gap-2 z-[1000]"
>
    {#each toastManager.toasts as toast (toast.id)}
        <Toast type={toast.type} ondismiss={() => toastManager.dismiss(toast.id)}>
            {toast.message}
        </Toast>
    {/each}
</div>
