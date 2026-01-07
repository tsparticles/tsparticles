import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadPathShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { PathDrawer } = await import("./PathDrawer.js");

        e.addShape(new PathDrawer());
    });
}
