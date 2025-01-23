import "./pathseg.js";
import { type Engine } from "@tsparticles/engine";
import { PolygonMaskPlugin } from "./PolygonMaskPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to add the plugin to
 * @param refresh -
 */
export async function loadPolygonMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new PolygonMaskPlugin(engine), refresh);
}

export * from "./Enums/PolygonMaskInlineArrangement.js";
export * from "./Enums/PolygonMaskMoveType.js";
export * from "./Enums/PolygonMaskType.js";
