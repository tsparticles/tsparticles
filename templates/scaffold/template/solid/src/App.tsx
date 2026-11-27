import type { ISourceOptions } from "@tsparticles/engine";
import { engine } from "../particlesEngine";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadSlim } from "@tsparticles/slim";
import { onMount } from "solid-js";

export default function App() {
  onMount(() => {
    void initParticlesEngine(engine, async engine => {
      await loadSlim(engine);
    });
  });

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

  return (
    <>
      <div id="app-content">
        <h1>Hello, tsParticles!</h1>
      </div>
      <Particles engine={engine} id="tsparticles" options={options} />
    </>
  );
}
