import { Engine } from "./engine";
import type { IOptions } from "./Options";
import type { RecursivePartial } from "./Types";

const tsParticles = new Engine();

tsParticles.init();

export { tsParticles };
export * from "./Core";
export * from "./Enums";
export type { Engine };
export * from "./Options";
export * from "./Utils";
export * from "./Types";
export type ISourceOptions = RecursivePartial<IOptions>;
