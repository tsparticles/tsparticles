import { type Engine } from "@tsparticles/engine";
import { ZigZagPathGenerator } from "./ZigZagPathGenerator.js";

declare const __VERSION__: string;

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadZigZagPath(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPathGenerator(zigZagPathName, new ZigZagPathGenerator(), refresh);
}
