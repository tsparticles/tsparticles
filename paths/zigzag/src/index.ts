import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 */
export function loadZigZagPath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { ZigZagPathGenerator } = await import("./ZigZagPathGenerator.js");

        e.addPathGenerator(zigZagPathName, new ZigZagPathGenerator());
    });
}
