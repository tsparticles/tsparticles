import "./pathseg";
import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPolygonMaskOptions, PolygonMaskOptions } from "./types";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import { PolygonMaskType } from "./Enums/PolygonMaskType";

/**
 */
class PolygonMaskPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "polygonMask";

        this._engine = engine;
    }

    getPlugin(container: Container): PolygonMaskInstance {
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

export * from "./Enums/PolygonMaskInlineArrangement";
export * from "./Enums/PolygonMaskMoveType";
export * from "./Enums/PolygonMaskType";
