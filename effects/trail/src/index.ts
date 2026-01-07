import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadTrailEffect(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { TrailDrawer } = await import("./TrailDrawer.js");

        e.addEffect("trail", new TrailDrawer());
    });
}
