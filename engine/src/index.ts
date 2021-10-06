import { initPjs } from "./pjs";
import { Main } from "./main";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Particle/Vector";
export * from "./Core/Container";
export * from "./Enums";
export { Main };
export * from "./Utils";
export * from "./Types";
export * from "./Core/Interfaces";
export * from "./Core/Particle";
export * from "./Core/ExternalInteractorBase";
export * from "./Core/ParticlesInteractorBase";
export { particlesJS, pJSDom, tsParticles };
export type { IOptions };
export type { IParticle };
export type ISourceOptions = RecursivePartial<IOptions>;
