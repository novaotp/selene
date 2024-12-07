<script lang="ts">
    import { prefersReducedMotion } from "svelte/motion";
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { getUser } from "$contexts/user.svelte";
    import { Avatar } from "$ui/data-display";
    import IconPalette from "@tabler/icons-svelte/icons/palette";
    import IconArrowNarrowLeft from "@tabler/icons-svelte/icons/arrow-narrow-left";
    import type { ComponentType, Snippet } from "svelte";
    import { Banner } from "$ui/feedback";
    import { Button, Label, Select } from "$ui/forms";
    import Root from "$ui/forms/label/Root.svelte";

    type Tab = { label: string; slug: string; Icon: ComponentType; component: Snippet };

    const userContext = getUser();

    const tabs: Tab[] = [
        {
            label: "Appearance",
            slug: "appearance",
            Icon: IconPalette,
            component: appearance
        }
    ];
</script>

<svelte:head>
    <title>Settings - Selene</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-5 p-5 pt-0">
    <h1>Settings</h1>
    <div class="relative flex w-full items-center justify-start gap-5 pb-5">
        <Avatar
            src={userContext.user.avatar}
            alt={userContext.user.name}
            fallback={userContext.user.getInitials()}
            class="w-16 text-xl"
        />
        <div class="flex flex-col">
            <span class="text-white">{userContext.user.name}</span>
            <span class="text-sm">{userContext.user.email}</span>
        </div>
    </div>
    <ul>
        {#each tabs as { label, slug, Icon }, i (i)}
            <li>
                <button onclick={() => goto(`?tab=${slug}`)} class="flex items-center gap-5">
                    <Icon class="min-h-6 min-w-6" />
                    {label}
                </button>
            </li>
        {/each}
    </ul>
</main>

{#if $page.url.searchParams.has("tab")}
    {@const tab = tabs.find((tab) => tab.slug === $page.url.searchParams.get("tab"))}
    <article
        transition:fly={{ x: -100, duration: prefersReducedMotion.current ? 0 : 400 }}
        class="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-start justify-start gap-5 bg-zinc-900 p-5"
    >
        <header class="relative flex w-full items-center justify-start">
            <button
                onclick={() => goto("/app/settings")}
                class="flex items-center justify-start gap-5"
            >
                <IconArrowNarrowLeft />
                <span>Back</span>
            </button>
        </header>
        <svelte:boundary>
            {@render tab!.component()}

            {#snippet failed()}
                <Banner type="error">This tab doesn't exist.</Banner>
            {/snippet}
        </svelte:boundary>
    </article>
{/if}

{#snippet appearance()}
    <div class="relative flex h-full w-full flex-col gap-5">
        <h2>Appearance</h2>
        <p>Customize the appearance of Selene.</p>
        <Banner type="info">Light theme coming soon...</Banner>
        <Label.Root class="flex-row items-center justify-between">
            <Label.Text for="theme">Theme</Label.Text>
            <Select.Root class="w-20">
                <Select.Option value="dark">Dark</Select.Option>
            </Select.Root>
        </Label.Root>
    </div>
{/snippet}
