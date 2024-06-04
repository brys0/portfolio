<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "m3-svelte";
    import avatar from "$lib/images/avatar.png";
    import Github from "lucide-svelte/icons/github";
    import Instagram from "lucide-svelte/icons/instagram";
    import Email from "lucide-svelte/icons/mail";
    import GanttChart from "lucide-svelte/icons/gantt-chart";
    import ServerCog from "lucide-svelte/icons/server-cog";
    import Cpu from "lucide-svelte/icons/cpu";
    import Wrench from "lucide-svelte/icons/wrench";
    import Pallete from "lucide-svelte/icons/palette";
    import Shield from "lucide-svelte/icons/shield";
    import Notebook from "lucide-svelte/icons/notebook";

    import { slide } from "svelte/transition";

    import ProjectCard from "$lib/components/projects/ProjectCard.svelte";
    import shuttleLogo from "$lib/images/shuttle-icon.svg";
    import spotlightLogo from "$lib/images/spotlight-icon.svg";
    import lightableLogo from "$lib/images/lightable-icon.png";
    import bgMountain from "$lib/images/Mountain.svg";
    const shuttle = {
        name: "Shuttle",
        description:
            "An easy to use file and picture upload service. With an intuitive to use frontend in shadcn/ui and a performant backend created using Javalin and Kotlin JVM.",
        source: "https://github.com/ShuttleUploader/Shuttle",
        demo: "#",
        image: shuttleLogo,
        tags: ["friendly", "modern", "fast", "intuitive"],
    };

    const spotlight = {
        name: "Spotlight",
        description:
            "End to end service to easily manage, create, and run your own show choir competition website. With easy statistics, advertisments, and more.",
        demo: "#",
        image: spotlightLogo,
        tags: [
            "professional",
            "stable",
            "all-in-one",
            "enterprise",
            "scalable",
        ],
    };

    const lightable = {
        name: "Lightable",
        description:
            "Lightweight easy to use Chat service. Built in Vue 3 with enhanced privacy security and an open-design model.",
        demo: "#",
        image: lightableLogo,
        tags: ["social", "voice video", "secure", "modern", "performant"],
    };

    let professions = [
        {
            text: "Software Engineer",
            icon: Cpu,
            color: "#f54c4c",
        },
        {
            text: "Homelabber",
            icon: ServerCog,
            color: "#4cf592",
        },
        {
            text: "Tinkerer",
            icon: Wrench,
            color: "#4c87f5",
        },
        {
            text: "Graphic Designer",
            icon: Pallete,
            color: "#ae4cf5",
        },
        {
            text: "Sysadmin",
            icon: Shield,
            color: "#4cf5db",
        },
        {
            text: "Student",
            icon: Notebook,
            color: "#8f8f8f",
        },
    ];

    let index = $state(0);
    let currentElement = $derived(professions[index]);
    let roller;
    let mounted = false;
    $effect(() => {
        roller = setInterval(() => {
            if (index === professions.length - 1) index = 0;
            else index++;
        }, 2000);
        mounted = true;
        return () => {
            clearInterval(roller);
        };
    });
</script>

<div class="bg-img w-full flex flex-col justify-around select-none">
    <div
        class="flex items-center justify-center gap-[20%] font-onest flex-wrap"
        id="hero"
    >
        <div class="inline-flex flex-col gap-12" id="social-name-wrapper">
            <div class="inline-flex gap-12 items-center rounded-lg" id="social-name">
                <div
                    class="inline-flex flex-col gap-3 items-center rounded-lg h-full justify-center flex-grow-1"
                    id="socials"
                >
                    <Button type="filed" iconType="full">
                        <Github size={32} />
                    </Button>
                    <div style="--m3-scheme-primary: 91 81 216;">
                        <Button type="filled" iconType="full">
                            <Instagram size={32} class="text-white/90" />
                        </Button>
                    </div>

                    <Button type="filled" iconType="full">
                        <Email size={32} />
                    </Button>
                </div>
                <div
                    class="inline-flex flex-col gap-4 justify-start items-start h-[172px] relative" id="roller"
                >
                    <div class="placeholder h-[40px]"></div>

                    <div class="roller absolute">
                        {#key index}
                            <h2
                                transition:slide
                                class="font-medium font-rubik text-4xl ml-[5px] text-gray-400 items-center gap-2 roller-item"
                            >
                                <div
                                    class="inline-flex flex-row gap-2 items-center"
                                >
                                    <svelte:component
                                        this={currentElement.icon}
                                        size={32}
                                        color={currentElement.color}
                                        class="animate-zoom-in animate-duration-250"
                                    />
                                    {currentElement.text}
                                </div>
                            </h2>
                        {/key}
                    </div>

                    <h1 class="font-bold text-8xl self-end" id="name">
                        Bryson T.
                    </h1>
                </div>
            </div>

            <!-- <div class="self-start">
            <Button
                display="inline-flex"
                type="tonal"
                iconType="left"
                on:click={() => goto("/projects")}
            >
                <GanttChart />
                Projects
            </Button>
        </div> -->
        </div>

        <img
            class="avatar min-h-[128px] h-[100%] max-h-[512px] aspect-ratio-square bg-transparent rounded-full"
            src={avatar}
        />

       
    </div>
    <div class="inline-flex justify-center items-center p-6 w-full">
        <div class="inline-flex gap-4 flex-wrap px-2">
            <div class="w-[95vw] max-w-[600px] flex-grow-1">
                <ProjectCard project={shuttle} />
            </div>
            <div class="w-[95vw] max-w-[600px] flex-grow-1">
                <ProjectCard project={spotlight} />
            </div>
            <div class="w-[95vw] max-w-[600px] flex-grow-1">
                <ProjectCard project={lightable} />
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes move-down {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100vh);
        }
    }

    @keyframes slideshow {
        0% {
            background-position: 50% 0;
        }
        100% {
            background-position: 50% 150%;
        }
    }

    @media only screen and (min-width: 1883px) {
        .bg-img {
            height: 100%;
        }
    }

    @media only screen and (max-width: 518px) {
        #hero {
            justify-content: center;
            align-items: start;
        }
        #social-name-wrapper {
            width: 100%;
        }

        #social-name {
            flex-direction: column;
            width: 100%;
            padding: 0;
            border-radius: 0;
        }

        #socials {
            width: 100%;
            flex-direction: row;
            background-color: rgb(0, 0, 0, 0.2);
            padding: 12px 32px;
            border-radius: 0;
            justify-content: space-between;
        }

        #name {
            font-size: 72px;
            margin-top: 24px;
        }
    }
</style>
