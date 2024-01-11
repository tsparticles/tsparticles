import { initPjs } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

const { particlesJS, pJSDom, Particles } = initPjs(tsParticles);

export * from "@tsparticles/engine";

export { particlesJS, pJSDom, Particles };
