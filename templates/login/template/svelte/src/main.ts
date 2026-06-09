import { mount } from "svelte";
import { initParticlesEngine } from "@tsparticles/svelte";
import { loadSlim } from "@tsparticles/slim";
import App from "./App.svelte";

void initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});

const app = mount(App, { target: document.getElementById("app")! });

export default app;
