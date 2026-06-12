import { mount } from "svelte";
import { initParticlesEngine } from "@tsparticles/svelte";
import { loadParticles } from "@tsparticles/particles";
import App from "./App.svelte";

void initParticlesEngine(async (engine) => {
  await loadParticles(engine);
});

const app = mount(App, { target: document.getElementById("app")! });

export default app;
