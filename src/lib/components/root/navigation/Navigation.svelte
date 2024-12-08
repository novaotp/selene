<script lang="ts">
    import { prefersReducedMotion } from "svelte/motion";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getUser } from "$contexts/user.svelte";
    import { cn } from "$utils/cn";
    import { Avatar } from "$ui/data-display";
    import { Backdrop } from "$ui/feedback";
    import IconMenu from "@tabler/icons-svelte/icons/menu";
    import IconInbox from "@tabler/icons-svelte/icons/inbox";
    import type { ComponentType } from "svelte";

    type Link = {
        label: string;
        href: string;
        Icon: ComponentType;
    };

    const userContext = getUser();

    let showMenu = $state(false);

    const links: Link[] = [
        {
            label: "Inbox",
            href: "/app",
            Icon: IconInbox
        }
    ];
</script>

<nav class="relative flex w-full justify-between p-5">
    <button onclick={() => (showMenu = true)}>
        <IconMenu />
    </button>
</nav>

{#if showMenu}
    <Backdrop close={() => (showMenu = false)} />
    <article
        transition:fly={{ x: -100, duration: prefersReducedMotion.current ? 0 : 150 }}
        class="fixed left-0 top-0 z-10 flex h-full min-w-60 flex-col gap-10 bg-zinc-900 p-5"
    >
        <button
            onclick={() => {
                goto("/app/settings");
                showMenu = false;
            }}
            class="flex items-center gap-5"
        >
            <Avatar
                src={userContext.user.avatar}
                fallback={userContext.user.getInitials()}
                alt="{userContext.user.name}'s avatar"
            />
            <span class="text-white">{userContext.user.name}</span>
        </button>
        <menu>
            {#each links as { label, href, Icon }, i (i)}
                {@render link({ label, href, Icon })}
            {/each}
        </menu>
    </article>
{/if}

{#snippet link({ label, href, Icon }: Link)}
    <li>
        <button
            onclick={() => {
                goto(href);
                showMenu = false;
            }}
            class={cn(
                "relative flex w-full gap-5 rounded-lg px-3 py-2",
                $page.url.pathname === href && "bg-zinc-800"
            )}
        >
            <Icon />
            <span>{label}</span>
        </button>
    </li>
{/snippet}
