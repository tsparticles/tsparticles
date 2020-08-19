<script>
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { tsParticles } from "tsparticles";

    export let options = {};
    export let id = "tsparticles";
    const dispatch = createEventDispatcher();
    let oldId = id;

    afterUpdate(() => {
        if (oldId) {
            const oldContainer = tsParticles.dom().find(c => c.id === oldId);

            if (oldContainer) {
                oldContainer.destroy();
            }
        }

        if (id) {
            tsParticles.load(id, options).then((container) => {
                dispatch("particlesLoaded", {
                    particles: container
                });

                oldId = id;
            });
        } else {
            dispatch("particlesLoaded", {
                particles: undefined
            });
        }
    });
</script>

<svelte:options accessors={true}/>

<div id={id}></div>

