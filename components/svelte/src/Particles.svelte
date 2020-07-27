<script>
    import { afterUpdate } from "svelte";
    import { tsParticles } from "tsparticles";

    export let options = {};
    export let id = "tsparticles";
    let oldId = id;

    afterUpdate(() => {
        if (oldId) {
            const oldContainer = tsParticles.dom().find(c => c.id == oldId);

            if (oldContainer) {
                oldContainer.destroy();
            }
        }

        if (id) {
            tsParticles.load(id, options).then(() => {
                oldId = id;
            });
        }
    });
</script>

<svelte:options accessors={true}/>

<div id={id}></div>

