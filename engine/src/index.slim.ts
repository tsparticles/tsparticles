import { initPjs } from "./pjs";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import { Engine } from "./engine";
import { loadSlim } from "./slim";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Engine();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

loadSlim(tsParticles);

export * from "./Core";
export * from "./Core/Container";
export * from "./Enums";
export { Engine, Engine as Main };
export * from "./Utils";
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
