import { mount } from "svelte";
import { initParticlesEngine } from "@tsparticles/svelte";
import { particles } from "@tsparticles/particles";
import App from "./App.svelte";

void initParticlesEngine(async () => {
  await particles.init();
});

const app = mount(App, { target: document.getElementById("app")! });

export default app;
