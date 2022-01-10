import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import { Engine } from "./engine";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Engine();

tsParticles.init();

export * from "./Core";
export * from "./Enums";
export { Engine };
export * from "./Utils";
export * from "./Types";
export { tsParticles };
export { IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
