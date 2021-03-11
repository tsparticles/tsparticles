import { Main } from "./main";
import { initPjs } from "./pjs";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Container";
export * from "./Core/Particle";
export * from "./Core/Particle/Vector";
export * from "./Core/Particle/Vector3d";
export * from "./Enums";
export * from "./Utils";
export * from "./Types";
export * from "./Core/Interfaces";
export * from "./Core/ExternalInteractorBase";
export * from "./Core/ParticlesInteractorBase";
export * from "./Options/Classes/ValueWithRandom";
export { tsParticles, particlesJS, pJSDom, Main, IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
