import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";
import "./style.css";

void initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});

defineParticlesElement();
