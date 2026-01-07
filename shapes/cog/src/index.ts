import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadCogShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { CogDrawer } = await import("./CogDrawer.js");

        e.addShape(new CogDrawer());
    });
}
