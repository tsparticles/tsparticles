import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export function loadMotionPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { MotionPlugin } = await import("./MotionPlugin.js");

        e.addPlugin(new MotionPlugin());
    });
}
