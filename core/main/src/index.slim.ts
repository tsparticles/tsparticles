import { MainSlim } from "./main.slim";
import { initPjs } from "./pjs";
import { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces/IParticle";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Particle/Vector";
export * from "./Core/Container";
export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils, MainSlim };
export * from "./Types";
export * from "./Core/Interfaces/IShapeValues";
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export { IParticle };
export type ISourceOptions = RecursivePartial<IOptions>;
