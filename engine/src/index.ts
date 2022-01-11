import { Engine } from "./engine";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";

const tsParticles = new Engine();

tsParticles.init();

export { tsParticles };
export * from "./Core";
export * from "./Enums";
export type { Engine };
export * from "./Utils";
export * from "./Types";
export type { IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
