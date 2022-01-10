import { Engine } from "./engine";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";
import type { Container } from "./Core/Container";
import type { Particle } from "./Core/Particle";

const tsParticles = new Engine();

tsParticles.init();

export { tsParticles };
export * from "./Core";
export * from "./Enums";
export type { Engine };
export * from "./Utils";
export * from "./Types";
export type { Container, IOptions, IParticle, Particle };
export type ISourceOptions = RecursivePartial<IOptions>;
