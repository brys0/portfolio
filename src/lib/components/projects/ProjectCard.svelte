<script lang="ts">
    import GitCommitHorizontal from "lucide-svelte/icons/git-commit-horizontal";
    import { Button } from "m3-svelte";
    import ExternalLink from "lucide-svelte/icons/external-link";
    import { formatMarqueeText } from "$lib/utils/index";
    import { Marquee } from "@selemondev/svelte-marquee";
    import "@selemondev/svelte-marquee/dist/style.css";

    let {
        children,
        project = {
            name: "N/A",
            description: "Not provided",
            source: "",
            demo: "",
            image: "",
            tags: ["tag", "here", "placeholder", "tags"],
        },
    } = $props<{
        children: Snippet,
        project: {
            name: string,
            description: string,
            source?: string,
            demo?: string,
            image: string,
            tags: string[],
        }
    }>();

    let active = $state(true);

    let projects = [
        {
            name: "Shuttle",
            description:
                "An easy to use file and picture upload service. With an intuitive to use frontend in shadcn/ui and a performant backend created using Javalin and Kotlin JVM.",
            source: "https://github.com/ShuttleUploader/Shuttle",
            demo: "#",
            image: "/shuttle.png",
            tags: ["friendly", "modern", "fast", "intuitive"],
        },
        {
            name: "Poopy",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur asperiores nulla laboriosam voluptatum mollitia ducimus in est ad non excepturi!",
            source: "https://github.com/poopy/poop",
            demo: "#",
            image: "/favicon.png",
            tags: ["neek", "bozo", "balls", "poopy!"],
        },
    ];

    const activeMarqueeOnHover = () => {
        active = false;
    };

    const disableMarqueeOnLeave = () => {
        active = true;
    };

    const toggleMarquee = () => {
        active = !active;
    }

    function process(func: any) {
        console.log
    }
</script>


<!-- {#snippet code(text)}
    {@html text}
{/snippet}

{#if children}
<span>{code(children)}</span>
{/if} -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
    class="relative col-span-1 flex flex-col gap-5 overflow-hidden rounded-lg border-2 border-black/5 border-opacity-60 bg-[#23272e] p-5 w-full h-full"
    on:mouseover={activeMarqueeOnHover}
    on:mouseout={disableMarqueeOnLeave}
    on:touchstart={toggleMarquee}
    role="banner"
>
    <div
        class="absolute left-0 top-1/2 flex w-full -translate-y-1/2 select-none flex-col justify-start gap-3 blur-3 transition-all duration-850 transition-ease {active
            ? ''
            : 'blur-8'}"
    >
        <!-- svelte-ignore a11y_distracting_elements -->
        <Marquee
            class="[--duration:60s] w-fill transform-gpu "
            innerClassName={active ? "" : "animate-paused"}
        >
            {#each formatMarqueeText(project.tags) as tag}
                <span class="font-marquee text-5xl font-black text-white/5"
                    >{tag}</span
                >
            {/each}
        </Marquee>
        <!-- svelte-ignore a11y_distracting_elements -->
        <Marquee
            class="[--duration:25s] w-fill transform-gpu"
            innerClassName={active ? "" : "animate-paused"}
        >
            {#each formatMarqueeText(project.tags) as tag}
                <span class="font-marquee text-5xl font-black text-white/8"
                    >{tag}</span
                >
            {/each}
        </Marquee>
        <!-- svelte-ignore a11y_distracting_elements -->
        <Marquee
            class="[--duration:40s] w-fill transform-gpu"
            innerClassName={active ? "" : "animate-paused"}
        >
            {#each formatMarqueeText(project.tags) as tag}
                <span class="font-marquee text-5xl font-black text-white/15"
                    >{tag}</span
                >
            {/each}
        </Marquee>
        <!-- svelte-ignore a11y_distracting_elements -->
        <Marquee
            class="[--duration:30s] w-fill transform-gpu"
            innerClassName={active ? "" : "animate-paused"}
        >
            {#each formatMarqueeText(project.tags) as tag}
                <span class="font-marquee text-5xl font-black text-white/10"
                    >{tag}</span
                >
            {/each}
        </Marquee>
    </div>
    <div class="flex items-start justify-between">
        <div class="flex flex-col gap-2">
            <p class="text-4xl font-bold drop-shadow">
                {project.name}
            </p>
            <p
                class="max-w-[80%] font-medium text-stroke-1 text-stroke-white/25 text-muted-foreground drop-shadow"
            >
                {project.description}
            </p>
        </div>
        <img src={project.image} alt="" class="h-20 w-20 drop-shadow" />
    </div>
    <div class="z-[1] flex gap-2 flex-grow-1 items-end">
        {#if project.demo}
            <a href={project.demo} target="_blank">
                <Button
                    display="inline-flex"
                    type="elevated"
                    iconType="left"
                >
                    <ExternalLink />
                    Demo
                </Button>
            </a>
        {/if}
        {#if project.source}
            <a href={project.source} target="_blank">
                <Button
                    display="inline-flex"
                    type="elevated"
                    iconType="left"
                >
                    <GitCommitHorizontal />
                    Source
                </Button>
            </a>
        {/if}
    </div>
</div>
