<script lang="ts">
  import { afterUpdate, createEventDispatcher } from "svelte";
  import { Container, tsParticles } from "tsparticles";

  export let options = {};
  export let url = "";
  export let id = "tsparticles";

  const dispatch = createEventDispatcher();
  const particlesInitEvent = "particlesInit";
  const particlesLoadedEvent = "particlesLoaded";

  let oldId = id;

  afterUpdate(() => {
    tsParticles.init();

    dispatch(particlesInitEvent, tsParticles);

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

      if (url) {
        tsParticles.loadJSON(id, url).then(cb);
      } else if (options) {
        tsParticles.load(id, options).then(cb);
      } else {
        console.error("You must specify options or url to load tsParticles");
      }
    } else {
      dispatch(particlesLoadedEvent, {
        particles: undefined,
      });
    }
  });
</script>

<svelte:options accessors={true} />

<div {id} />
