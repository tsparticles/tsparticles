import "./style.css";

import { type Particles, defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import type { ISourceOptions } from "@tsparticles/engine";

import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  particles: {
    number: { value: 50 },
  },
};

void initParticlesEngine(engine, async engine => {
  await loadSlim(engine);
});

defineParticlesElement();
for (const element of document.querySelectorAll("web-particles")) {
  const particles = element as Particles;

  particles.options = options;
  particles.engine = engine;
}
