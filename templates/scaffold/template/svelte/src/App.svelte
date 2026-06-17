<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import type { ISourceOptions } from "@tsparticles/engine";

  const options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#1a1a2e" } },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 4 }, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  };
</script>

<div id="app-content">
  <h1>Hello, tsParticles!</h1>
</div>
<Particles id="tsparticles" options={options} />

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }

  #app-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    text-align: center;
    color: #fff;
    pointer-events: none;
  }

  h1 {
    font-size: 3.2em;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
</style>
