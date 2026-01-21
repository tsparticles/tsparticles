import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 */
export async function loadZigZagPath(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async e => {
        const { ZigZagPathGenerator } = await import("./ZigZagPathGenerator.js");

        e.addPathGenerator(zigZagPathName, new ZigZagPathGenerator());
    });
}
