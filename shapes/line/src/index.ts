import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadLineShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { LineDrawer } = await import("./LineDrawer.js");

        e.addShape(new LineDrawer());
    });
}
