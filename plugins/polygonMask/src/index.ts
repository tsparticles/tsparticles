import "./pathseg.js";
import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPolygonMaskOptions, PolygonMaskOptions } from "./types.js";
import { PolygonMask } from "./Options/Classes/PolygonMask.js";
import type { PolygonMaskInstance } from "./PolygonMaskInstance.js";
import { PolygonMaskType } from "./Enums/PolygonMaskType.js";

/**
 */
class PolygonMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "polygonMask";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<PolygonMaskInstance> {
        const { PolygonMaskInstance } = await import("./PolygonMaskInstance.js");

        return new PolygonMaskInstance(container, this._engine);
    }

    loadOptions(options: PolygonMaskOptions, source?: RecursivePartial<IPolygonMaskOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let polygonOptions = options.polygon;

        if (polygonOptions?.load === undefined) {
            options.polygon = polygonOptions = new PolygonMask();
        }

        polygonOptions.load(source?.polygon);
    }

    needsPlugin(options?: RecursivePartial<IPolygonMaskOptions>): boolean {
        return (
            options?.polygon?.enable ??
            (options?.polygon?.type !== undefined && options.polygon.type !== PolygonMaskType.none)
        );
    }
}

/**
 * @param engine - The engine to add the plugin to
 * @param refresh -
 */
export async function loadPolygonMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new PolygonMaskPlugin(engine), refresh);
}

export * from "./Enums/PolygonMaskInlineArrangement.js";
export * from "./Enums/PolygonMaskMoveType.js";
export * from "./Enums/PolygonMaskType.js";
