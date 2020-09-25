import { initPjs } from "./pjs";
import { Main } from "./main";
import { CanvasUtils, ColorUtils, Constants, Utils } from "./Utils";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { CanvasUtils, ColorUtils, Constants, Utils };
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };
