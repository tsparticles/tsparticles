import App from "./App.svelte";
import { engine } from "../particlesEngine";
import { initParticlesEngine } from "@tsparticles/svelte";
import { loadSlim } from "@tsparticles/slim";
import { mount } from "svelte";

void initParticlesEngine(engine, async engine => {
  await loadSlim(engine);
});

const app = mount(App, { target: document.getElementById("app")! });

export default app;
