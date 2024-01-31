import type { Engine } from "@tsparticles/engine";

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadZigZagPath(engine: Engine, refresh = true): Promise<void> {
    const { ZigZagPathGenerator } = await import("./ZigZagPathGenerator.js");

    await engine.addPathGenerator(zigZagPathName, new ZigZagPathGenerator(), refresh);
}
