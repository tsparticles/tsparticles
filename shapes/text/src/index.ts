import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadTextShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { TextDrawer } = await import("./TextDrawer.js");

        e.addShape(new TextDrawer());
    });
}
