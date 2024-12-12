<script lang="ts">
    import { prefersReducedMotion } from "svelte/motion";
    import { fly } from "svelte/transition";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { getUser } from "$contexts/user.svelte";
    import { Avatar } from "$ui/data-display";
    import { Banner } from "$ui/feedback";
    import { Label, Select } from "$ui/forms";
    import IconArrowNarrowLeft from "@tabler/icons-svelte/icons/arrow-narrow-left";
    import IconLogout from "@tabler/icons-svelte/icons/logout";
    import IconScript from "@tabler/icons-svelte/icons/script";
    import IconSettings from "@tabler/icons-svelte/icons/settings";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { timeZone, timeZones } from "$stores/timezone.svelte";
    import type { ComponentType, Snippet } from "svelte";

    let { data } = $props();

    type Tab = {
        label: string;
        slug: string;
        description: string;
        Icon: ComponentType;
    } & (
        | {
              component: Snippet;
              href?: never;
          }
        | {
              component?: never;
              href: string;
          }
    );

    const tabGroup: Record<string, Tab[]> = {
        Account: [
            {
                label: "Preferences",
                slug: "preferences",
                description: "Customize your preferences.",
                Icon: IconSettings,
                component: preferences
            }
        ],
        Other: [
            {
                label: "About the app",
                slug: "about",
                description: "Learn more about Selene.",
                Icon: IconScript,
                component: about
            },
            {
                label: "Logout",
                slug: "logout",
                description: "Log out of your account.",
                Icon: IconLogout,
                href: "/logout"
            }
        ]
    };

    const userContext = getUser();

    const findTab = (slug: string): Tab | undefined =>
        Object.values(tabGroup)
            .flatMap((tabs) => tabs)
            .find((tab) => tab.slug === slug);

    const onTimeZoneChange = (value: string) => {
        // TODO : ask the user if they want to adapt all the datetimes of the existing tasks

        console.log(value);
    };
</script>

<svelte:head>
    <title>Settings - {PUBLIC_APP_NAME}</title>
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
    <ul class="relative flex w-full flex-col items-start justify-start gap-5">
        {#each Object.entries(tabGroup) as [category, tabs], i (i)}
            <li class="relative flex w-full flex-col gap-2">
                <h2>{category}</h2>
                {#each tabs as { label, slug, description, Icon, href }, i (i)}
                    {@const targetHref = href ?? `?tab=${slug}`}
                    <button
                        onclick={() => goto(targetHref)}
                        class="flex items-start justify-start gap-5 py-2"
                    >
                        <div class="relative rounded-lg bg-zinc-800 p-2">
                            <Icon class="min-h-6 min-w-6" />
                        </div>
                        <div class="flex flex-col items-start gap-1">
                            <span class="text-white/80">{label}</span>
                            <p class="text-start text-sm">{description}</p>
                        </div>
                    </button>
                {/each}
            </li>
        {/each}
    </ul>
</main>

{#if $page.url.searchParams.has("tab")}
    {@const tab = findTab($page.url.searchParams.get("tab")!)}
    <article
        transition:fly={{ x: -100, duration: prefersReducedMotion.current ? 0 : 150 }}
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
            {@render tab!.component!()}

            {#snippet failed()}
                <Banner type="error">This tab doesn't exist.</Banner>
            {/snippet}
        </svelte:boundary>
    </article>
{/if}

{#snippet preferences()}
    <div class="relative flex h-full w-full flex-col gap-5">
        <h3>Preferences</h3>
        <p>Customize your preferences.</p>
        <Label.Root class="flex-row items-center justify-between">
            <Label.Text for="timezone">Time Zone</Label.Text>
            <Select.Root class="w-40" onchange={onTimeZoneChange}>
                {#each Object.entries(timeZones) as [label, offset]}
                    <Select.Option value={offset.toString()} selected={offset === timeZone.offset}>
                        {label}
                    </Select.Option>
                {/each}
            </Select.Root>
        </Label.Root>
        <Label.Root class="flex-row items-center justify-between">
            <Label.Text for="theme">Theme</Label.Text>
            <Select.Root class="w-20">
                <Select.Option value="dark" selected>Dark</Select.Option>
            </Select.Root>
        </Label.Root>
        <Label.Root class="flex-row items-center justify-between">
            <Label.Text for="language">Language</Label.Text>
            <Select.Root class="w-20">
                <Select.Option value="en" selected>English</Select.Option>
            </Select.Root>
        </Label.Root>
    </div>
{/snippet}

{#snippet about()}
    <div class="relative flex h-full w-full flex-col gap-5">
        <h3>About</h3>
        <span>Version : {data.appVersion}</span>
        <p>
            Selene makes it easy to manage your to-do list, so you can focus your time on what
            really matters.
        </p>
    </div>
{/snippet}
