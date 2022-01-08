import { initPjs } from "./pjs";
import { Engine } from "./engine";
import type { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import type { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import type { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import type { RecursivePartial } from "./Types";
import { loadFull } from "./full";

const tsParticles = new Engine();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

loadFull(tsParticles);

export * from "./Core";
export * from "./Core/Container";
export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { Engine, Engine as Main };
export * from "./Utils";
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export type ISourceOptions = RecursivePartial<IOptions>;
