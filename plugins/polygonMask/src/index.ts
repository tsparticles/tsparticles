import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to add the plugin to
 */
export function loadPolygonMaskPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { PolygonMaskPlugin } = await import("./PolygonMaskPlugin.js");

        e.addPlugin(new PolygonMaskPlugin(engine));
    });
}

export * from "./Enums/PolygonMaskInlineArrangement.js";
export * from "./Enums/PolygonMaskMoveType.js";
export * from "./Enums/PolygonMaskType.js";
