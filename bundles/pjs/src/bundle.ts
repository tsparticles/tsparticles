import { initPjs } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

// eslint-disable-next-line @typescript-eslint/no-deprecated
const { particlesJS, pJSDom, Particles } = initPjs(tsParticles);

export * from "@tsparticles/engine";

export { particlesJS, pJSDom, Particles };
