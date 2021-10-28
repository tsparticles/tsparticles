import { Main } from "./main";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";
import type { Container } from "./Core/Container";
import type { Particle } from "./Core/Particle";

const tsParticles = new Main();

tsParticles.init();

export { tsParticles };
export * from "./Core/Particle/Vector";
export * from "./Enums";
export type { Main };
export * from "./Utils";
export * from "./Types";
export * from "./Core/Interfaces";
export * from "./Core/ExternalInteractorBase";
export * from "./Core/ParticlesInteractorBase";
export type { Container, IOptions, IParticle, Particle };
export type ISourceOptions = RecursivePartial<IOptions>;
