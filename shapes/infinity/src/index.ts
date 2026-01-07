import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadInfinityShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { InfinityDrawer } = await import("./InfinityDrawer.js");

        e.addShape(new InfinityDrawer());
    });
}
