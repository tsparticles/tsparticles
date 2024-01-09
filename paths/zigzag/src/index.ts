import type { Engine } from "@tsparticles/engine";
import { ZigZagPathGenerator } from "./ZigZagPathGenerator.js";

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadZigZagPath(engine: Engine, refresh = true): Promise<void> {
    await engine.addPathGenerator(zigZagPathName, new ZigZagPathGenerator(), refresh);
}
