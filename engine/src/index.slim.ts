import { initPjs } from "./pjs";
import { Circle, CircleWarp, Constants, Point, Rectangle } from "./Utils";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import type { IParticle } from "./Core/Interfaces";
import { Main } from "./main";

/* ---------- tsParticles functions - start ------------ */
const tsParticles = new Main();

(async () => {
    const { loadSlim } = await import(
        /* webpackChunkName: "tsparticles.bundle.slim" */
        /* webpackMode: "lazy-once" */
        "./slim"
    );

    await loadSlim(tsParticles);

    tsParticles.init();
})();

const { particlesJS, pJSDom } = initPjs(tsParticles);

export * from "./Core/Particle/Vector";
export * from "./Core/Container";
export * from "./Enums";
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
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export { IParticle };
export type ISourceOptions = RecursivePartial<IOptions>;
