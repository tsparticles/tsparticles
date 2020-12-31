import { initPjs } from "tsparticles-core/pjs";
import { Main } from "./main";
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
import { IOptions as ISlimOptions } from "tsparticles-core/Options/Interfaces/IOptions";
import { IAbsorberOptions } from "tsparticles-core/Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import { IEmitterOptions } from "tsparticles-core/Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import { IPolygonMaskOptions } from "tsparticles-core/Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import { RecursivePartial } from "tsparticles-core/Types";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "tsparticles-core/Core/Container";
export * from "tsparticles-core/Enums";
export * from "tsparticles-core/Plugins/Absorbers/Enums";
export * from "tsparticles-core/Plugins/Emitters/Enums";
export * from "tsparticles-core/Plugins/PolygonMask/Enums";
export * from "tsparticles-core/Types";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils, Main };
export * from "tsparticles-core/Types";
export { tsParticles, particlesJS, pJSDom };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export type ISourceOptions = RecursivePartial<IOptions>;
