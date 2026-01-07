import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadShadowEffect(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ShadowDrawer } = await import("./ShadowDrawer.js");

        e.addEffect("shadow", new ShadowDrawer(e));
    });
}
