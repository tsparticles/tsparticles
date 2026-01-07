import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadCanvasMaskPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { CanvasMaskPlugin } = await import("./CanvasMaskPlugin.js");

        e.addPlugin(new CanvasMaskPlugin());
    });
}
