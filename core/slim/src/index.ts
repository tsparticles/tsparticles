import { MainSlim } from "./main";
import { initPjs } from "tsparticles-core/pjs";
import {
    CanvasUtils,
    Circle,
    CircleWarp,
    ColorUtils,
    Constants,
    Point,
    Rectangle,
    Utils,
} from "tsparticles-core/Utils";
import type { IOptions as ISlimOptions } from "tsparticles-core/Options/Interfaces/IOptions";
import type { RecursivePartial } from "tsparticles-core/Types";
import type { IAbsorberOptions } from "tsparticles-core/Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import type { IEmitterOptions } from "tsparticles-core/Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IPolygonMaskOptions } from "tsparticles-core/Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "tsparticles-core/Core/Container";
export * from "tsparticles-core/Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils, MainSlim };
export * from "tsparticles-core/Types";
export { tsParticles, particlesJS, pJSDom };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export type ISourceOptions = RecursivePartial<IOptions>;
