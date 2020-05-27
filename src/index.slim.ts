import { MainSlim } from "./main.slim";
import { initPjs } from "./pjs";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();
const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { tsParticles, particlesJS, pJSDom };
