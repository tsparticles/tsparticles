import { initPjs } from "./pjs";
import { Main } from "./main";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };
