import { Main } from "./main";
import { initPjs } from "./pjs";
import { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
import type { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import type { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Container";
export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils, Main };
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export type ISourceOptions = RecursivePartial<IOptions>;
