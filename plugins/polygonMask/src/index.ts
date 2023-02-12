import "./pathseg";
import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import type { IPolygonMaskOptions, PolygonMaskOptions } from "./types";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import { PolygonMaskType } from "./Enums/PolygonMaskType";

/**
 * @category Polygon Mask Plugin
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

export async function loadPolygonMaskPlugin(engine: Engine): Promise<void> {
    const plugin = new PolygonMaskPlugin(engine);

    await engine.addPlugin(plugin);
}

export * from "./Enums/PolygonMaskInlineArrangement";
export * from "./Enums/PolygonMaskMoveType";
export * from "./Enums/PolygonMaskType";
