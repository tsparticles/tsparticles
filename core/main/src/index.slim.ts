import { MainSlim } from "./main.slim";
import { initPjs, IParticlesJS } from "./pjs";
import { Container } from "./Core/Container";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new MainSlim();

tsParticles.init();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Enums";
export { CanvasUtils, Circle, CircleWarp, ColorUtils, Constants, Point, Rectangle, Utils } from "./Utils";
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };

declare global {
    interface Window {
        tsParticles: MainSlim;
        particlesJS: IParticlesJS;
        pJSDom: Container[];
    }
}

window.particlesJS = particlesJS;
window.pJSDom = pJSDom;
window.tsParticles = tsParticles;
