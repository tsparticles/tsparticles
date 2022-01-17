import { initPjs } from ".";
import { tsParticles } from "tsparticles-engine";

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "tsparticles-engine";
export { particlesJS, pJSDom };
