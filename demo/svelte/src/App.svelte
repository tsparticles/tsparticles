<script>
    import Particles from "svelte-particles";

    export let name;

    let particlesConfig = {
        particles: {
            color: {
                value: '#000'
            },
            links: {
                enable: true,
                color: '#000'
            },
            move: {
                enable: true
            }
        }
    };

    let ref = {};

    let handleParticlesLoaded = (e) => {
        const container = e.detail.particles;

        console.log(container);

        // use container to call it's methods
    }
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    <Particles id="tsparticles" options={particlesConfig} on:particlesLoaded={handleParticlesLoaded}/>
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
