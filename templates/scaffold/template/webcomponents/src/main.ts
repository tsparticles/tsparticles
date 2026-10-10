import { tsParticles } from "@tsparticles/engine";
import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";
import "./style.css";

globalThis.tsParticles = tsParticles;

void initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});

defineParticlesElement();