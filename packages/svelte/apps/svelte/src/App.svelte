<script lang="ts">
    import configs from "@tsparticles/configs";
    import type { Container, Engine } from "@tsparticles/engine";
    import Particles, { particlesInit } from "@tsparticles/svelte";
    import { loadFull } from "tsparticles";
    import type { EventHandler } from "svelte/elements";

    void particlesInit(async (engine: Engine) => {
        await loadFull(engine);
    });

    export let name: string;

    let particlesConfig = configs.basic;

    let ref = {};

    let handleParticlesLoaded = (e: EventHandler<Container | undefined>) => {
        const container = e.detail.particles;

        console.log(container);

        // use container to call its methods
    };
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <Particles id="tsparticles" class="my-class" options={particlesConfig} on:particlesLoaded={handleParticlesLoaded}/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
