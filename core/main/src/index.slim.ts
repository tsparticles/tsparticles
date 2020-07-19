import { MainSlim } from "./main.slim";
import { initPjs } from "./pjs";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };
