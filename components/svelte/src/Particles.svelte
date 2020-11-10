<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { tsParticles } from "tsparticles";

    export let options = {};
    export let id = "tsparticles";

    const dispatch = createEventDispatcher();
    const particlesInitEvent = "particlesInit";
    const particlesLoadedEvent = "particlesLoaded";

    let oldId = id;

    afterUpdate(() => {
        tsParticles.init();

        dispatch(particlesInitEvent, tsParticles);

        if (oldId) {
            const oldContainer = tsParticles.dom().find(c => c.id === oldId);

            if (oldContainer) {
                oldContainer.destroy();
            }
        }

        if (id) {
            tsParticles.load(id, options).then((container) => {
                dispatch(particlesLoadedEvent, {
                    particles: container
                });

                oldId = id;
            });
        } else {
            dispatch(particlesLoadedEvent, {
                particles: undefined
            });
        }
    });
</script>

<svelte:options accessors={true}/>

<div id={id}></div>

