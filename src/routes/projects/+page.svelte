<script>
    import { goto } from "$app/navigation";
    import ProjectCard from "$lib/components/projects/ProjectCard.svelte";
    import shuttleLogo from "$lib/images/shuttle-icon.svg";
    import spotlightLogo from "$lib/images/spotlight-icon.svg";
    import lightableLogo from "$lib/images/lightable-icon.png";

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
        tags: ["professional", "stable", "all-in-one", "enterprise", "scalable"],
    };

    const lightable = {
        name: "Lightable",
        description:
            "Lightweight easy to use Chat service. Built in Vue 3 with enhanced privacy security and an open-design model.",
        demo: "#",
        image: lightableLogo,
        tags: ["social", "voice video", "secure", "modern", "performant"],
    };
</script>

<div
    class="flex h-[100dvh] w-full items-center justify-center"
>
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
