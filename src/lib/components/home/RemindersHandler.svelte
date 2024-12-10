<script lang="ts">
    import { Backdrop, Modal } from "$ui/feedback";
    import { Button, Input, Label, Select } from "$ui/forms";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import IconX from "@tabler/icons-svelte/icons/x";
    import type { Reminder } from "$models/index.svelte";
    import { v4 } from "uuid";
    import Root from "$ui/forms/label/Root.svelte";

    interface Props {
        /** Existing reminder. */
        reminders?: Reminder[];
    }

    let { reminders = $bindable([]) }: Props = $props();

    let showModal = $state(false);

    const addDefaultReminder = () => {
        reminders.push({ id: v4(), type: "notification", value: 30, unit: "minutes" });
    };

    const removeById = (id: string) => {
        reminders = reminders.filter((reminder) => reminder.id !== id);
    };

    const close = () => (showModal = false);
</script>

<Label.Root class="flex-row items-center justify-between">
    <Label.Text for="reminders">Reminders</Label.Text>
    <Button onclick={() => (showModal = true)}>Manage</Button>
</Label.Root>

{#if showModal}
    <Backdrop {close} />
    <Modal class="overflow-visible">
        <div class="relative flex w-full items-center justify-between">
            <div class="flex items-center gap-5">
                <Button
                    onclick={close}
                    class="grid h-10 place-items-center p-0 dark:bg-transparent"
                >
                    <IconX class="size-5 text-white" />
                </Button>
                <h2 class="text-xl font-semibold">Reminders</h2>
            </div>
            <Button
                onclick={addDefaultReminder}
                class="grid aspect-square h-10 place-items-center p-0"
            >
                <IconPlus />
            </Button>
        </div>
        <p>Manage your reminders here.</p>
        <ul class="relative flex w-full flex-col gap-[10px]">
            {#each reminders as reminder (reminder.id)}
                <div class="relative flex h-[50px] w-full items-center gap-[10px]">
                    <Select.Root bind:value={reminder.type}>
                        <Select.Option
                            value="notification"
                            selected={reminder.type === "notification"}
                        >
                            Notification
                        </Select.Option>
                        <Select.Option value="email" selected={reminder.type === "email"}>
                            Email
                        </Select.Option>
                    </Select.Root>
                    <Input type="number" bind:value={reminder.value} />
                    <Select.Root bind:value={reminder.unit}>
                        <Select.Option value="minutes" selected={reminder.unit === "minutes"}>
                            Minutes
                        </Select.Option>
                        <Select.Option value="hours" selected={reminder.unit === "hours"}>
                            Hours
                        </Select.Option>
                        <Select.Option value="days" selected={reminder.unit === "days"}>
                            Days
                        </Select.Option>
                        <Select.Option value="weeks" selected={reminder.unit === "weeks"}>
                            Weeks
                        </Select.Option>
                    </Select.Root>
                    <Button
                        onclick={() => removeById(reminder.id)}
                        class="grid h-10 place-items-center p-0 dark:bg-transparent"
                    >
                        <IconX class="size-5 text-white" />
                    </Button>
                </div>
            {/each}
        </ul>
    </Modal>
{/if}
