import { initPjs } from "./pjs";
import * as CanvasUtils from "./Utils/CanvasUtils";
import * as ColorUtils from "./Utils/ColorUtils";
import * as Utils from "./Utils/Utils";
import { Circle, CircleWarp, Constants, Point, Rectangle } from "./Utils";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";
import { Main } from "./main";
import { loadSlim } from "./slim";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Main();

tsParticles.init();

loadSlim(tsParticles);

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Particle/Vector";
export * from "./Core/Container";
export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils, Main, loadSlim };
export * from "./Types";
export * from "./Core/Interfaces";
export * from "./Core/Particle";
export * from "./Core/ExternalInteractorBase";
export * from "./Core/ParticlesInteractorBase";
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export { IParticle };
export type ISourceOptions = RecursivePartial<IOptions>;
