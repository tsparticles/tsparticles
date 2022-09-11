import "./pathseg";
import type { Container, Engine, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { PolygonMaskOptions } from "./types";
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

    loadOptions(options: Options, source?: RecursivePartial<PolygonMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as PolygonMaskOptions;
        let polygonOptions = optionsCast.polygon as PolygonMask;

        if (polygonOptions?.load === undefined) {
            optionsCast.polygon = polygonOptions = new PolygonMask();
        }

        polygonOptions.load(source?.polygon);
    }

    needsPlugin(options?: RecursivePartial<PolygonMaskOptions>): boolean {
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
export * from "./Options/Interfaces/IPolygonMaskOptions";
