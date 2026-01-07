import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadRoundedPolygonShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { RoundedPolygonDrawer } = await import("./RoundedPolygonDrawer.js");

        e.addShape(new RoundedPolygonDrawer());
    });
}
