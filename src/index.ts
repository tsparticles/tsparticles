import { initPjs } from "./pjs";
import { Main } from "./main";

const tsParticles = new Main();
const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { particlesJS, pJSDom, tsParticles };
