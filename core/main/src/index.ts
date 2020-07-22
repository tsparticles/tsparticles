import { initPjs, IParticlesJS } from "./pjs";
import { Main } from "./main";
import type { Container } from "./Core/Container";

const tsParticles = new Main();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };

declare global {
    interface Window {
        tsParticles: Main;
        particlesJS: IParticlesJS;
        pJSDom: Container[];
    }
}

window.particlesJS = particlesJS;
window.pJSDom = pJSDom;
window.tsParticles = tsParticles;
