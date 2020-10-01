import { MainSlim } from "./main.slim";
import { initPjs } from "./pjs";
import { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Container";
export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils };
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };
export * from "./Options/Interfaces/IOptions";
