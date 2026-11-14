import type { ISourceOptions } from "@tsparticles/engine";
import { createParticles } from "@tsparticles/particles";
import { engine } from "../particlesEngine";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
const particles = createParticles(engine);
import { onMount } from "solid-js";

export default function App() {
  onMount(() => {
    void initParticlesEngine(engine, async () => {
      await particles.init();
    });
  });

  const options: ISourceOptions = {
    background: { color: { value: "#0d0d2b" } },
    fpsLimit: 120,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 5 } },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return (
    <>
      <div id="app-content">
        <h1>tsParticles</h1>
      </div>
      <Particles engine={engine} id="tsparticles" options={options} />
    </>
  );
}
