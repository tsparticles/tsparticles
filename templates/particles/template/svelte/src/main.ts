import App from "./App.svelte";
import { createParticles } from "@tsparticles/particles";
import { engine } from "../particlesEngine";
import { initParticlesEngine } from "@tsparticles/svelte";
import { mount } from "svelte";

const particles = createParticles(engine);

void initParticlesEngine(engine, async () => {
  await particles.init();
});

const app = mount(App, { target: document.getElementById("app")! });

export default app;
