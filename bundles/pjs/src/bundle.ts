import { tsParticles } from "tsparticles-engine";
import { initPjs } from ".";

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "tsparticles-engine";
export { particlesJS, pJSDom };
