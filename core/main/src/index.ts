import { initPjs } from "./pjs";
import { Main } from "./main";
import { CanvasUtils, ColorUtils, Constants, Utils } from "./Utils";
import { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import { RecursivePartial } from "./Types";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Container";
export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { CanvasUtils, ColorUtils, Constants, Utils };
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export type ISourceOptions = RecursivePartial<IOptions>;
