<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { tsParticles } from "tsparticles-engine";

    export let options = {};
    export let url = "";
    export let id = "tsparticles";
    export let particlesInit;

    const dispatch = createEventDispatcher();

    const particlesLoadedEvent = "particlesLoaded";

    let oldId = id;

    afterUpdate(async () => {
        tsParticles.init();

        if (particlesInit) {
            await particlesInit(tsParticles);
        }

        if (oldId) {
            const oldContainer = tsParticles.dom().find((c) => c.id === oldId);

            if (oldContainer) {
                oldContainer.destroy();
            }
        }

        if (id) {
            const cb = (container) => {
                dispatch(particlesLoadedEvent, {
                    particles: container,
                });

                oldId = id;
            };

            let container;

            if (url) {
                container = await tsParticles.loadJSON(id, url);
            } else if (options) {
                container = await tsParticles.load(id, options);
            } else {
                console.error("You must specify options or url to load tsParticles");

                return;
            }

            cb(container);
        } else {
            dispatch(particlesLoadedEvent, {
                particles: undefined,
            });
        }
    });
</script>

<svelte:options accessors={true}/>

<div {id}/>
