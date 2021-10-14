import { initPjs } from "./pjs";
import { Main } from "./main";
import { Circle, CircleWarp, Constants, Point, Rectangle } from "./Utils";
import type { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import type { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import type { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";
import { loadFull } from "./full";

const tsParticles = new Main();

tsParticles.init();

loadFull(tsParticles);

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Particle/Vector";
export * from "./Core/Container";
export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { Circle, CircleWarp, Constants, Point, Rectangle, Main };
export * from "./Utils/CanvasUtils";
export * from "./Utils/ColorUtils";
export * from "./Utils/NumberUtils";
export * from "./Utils/Utils";
export * from "./Types";
export * from "./Core/Interfaces";
export * from "./Core/Particle";
export * from "./Core/ExternalInteractorBase";
export * from "./Core/ParticlesInteractorBase";
export { particlesJS, pJSDom, tsParticles };
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export { IParticle };
export type ISourceOptions = RecursivePartial<IOptions>;
