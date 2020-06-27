import { initPjs } from "./pjs";
import { Main } from "./main";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { particlesJS, pJSDom, tsParticles };
