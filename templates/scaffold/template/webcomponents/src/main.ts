import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";

import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";
import "./style.css";

void initParticlesEngine(engine, async engine => {
  await loadSlim(engine);
});

defineParticlesElement();
for (const element of document.querySelectorAll("web-particles")) {
  (element as import("@tsparticles/webcomponents").Particles).engine = engine;
}
