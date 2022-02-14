import type { Container, Engine, IOptions, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import type { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import { PolygonMaskType } from "./Enums";
import { isSsr } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
class PolygonMaskPlugin implements IPlugin {
    readonly id;
    readonly #engine;

    constructor(engine: Engine) {
        this.id = "polygonMask";

        this.#engine = engine;
    }

    getPlugin(container: Container): PolygonMaskInstance {
        return new PolygonMaskInstance(container, this.#engine);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IPolygonMaskOptions>): boolean {
        return (
            options?.polygon?.enable ??
            (options?.polygon?.type !== undefined && options.polygon.type !== PolygonMaskType.none)
        );
    }

    loadOptions(options: Options, source?: RecursivePartial<IOptions & IPolygonMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as IPolygonMaskOptions;
        let polygonOptions = optionsCast.polygon as PolygonMask;

        if (polygonOptions?.load === undefined) {
            optionsCast.polygon = polygonOptions = new PolygonMask();
        }

        polygonOptions.load(source?.polygon);
    }
}

export async function loadPolygonMaskPlugin(engine: Engine): Promise<void> {
    if (!isSsr() && !("SVGPathSeg" in window)) {
        await import(
            /* webpackChunkName: "tsparticles.pathseg.min" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            "./pathseg"
        );
    }

    const plugin = new PolygonMaskPlugin(engine);

    await engine.addPlugin(plugin);
}

export * from "./Enums";
