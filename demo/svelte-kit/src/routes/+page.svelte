<script lang="ts">
    import Counter from './Counter.svelte';
    import welcome from '$lib/images/svelte-welcome.webp';
    import welcome_fallback from '$lib/images/svelte-welcome.png';
    import { particlesInit } from "@tsparticles/svelte";
    import { loadFull } from "tsparticles";
    import { type Engine } from "@tsparticles/engine";
    import { browser } from '$app/environment';

    let particlesConfig = {
        particles: {
            color: {
                value: "#000",
            },
            links: {
                enable: true,
                color: "#000",
            },
            number: {
                value: 80
            },
            move: {
                enable: true,
            },
        },
    };

    void particlesInit(async (engine: Engine) => {
        await loadFull(engine);
    });

    const ParticlesConstructor = browser ?
        import('@tsparticles/svelte').then((module) => module.default) :
        new Promise(() => {
        });
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<section>
    <h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp"/>
				<img src={welcome_fallback} alt="Welcome"/>
			</picture>
		</span>

        to your new<br/>SvelteKit app
    </h1>

    <h2>
        try editing <strong>src/routes/+page.svelte</strong>
    </h2>

    <Counter/>

    {#await ParticlesConstructor}
        <p>Loading...</p>
    {:then component}
        <svelte:component this={component} id="tsparticles"
                          options="{particlesConfig}"/>
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
