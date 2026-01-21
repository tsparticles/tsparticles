import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadPathShape(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { PathDrawer } = await import("./PathDrawer.js");

        e.addShape(new PathDrawer());
    });
}
