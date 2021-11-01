import type { IPlugin } from "tsparticles-engine";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "tsparticles-engine";
import type { RecursivePartial } from "tsparticles-engine";
import type { IOptions } from "tsparticles-engine/Options/Interfaces/IOptions";
import type { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";
import { Options } from "tsparticles-engine/Options/Classes/Options";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { Type } from "./Enums";
import type { Main } from "tsparticles-engine";
import { isSsr } from "tsparticles-engine";

/**
 * @category Polygon Mask Plugin
 */
class Plugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "polygonMask";
    }

    getPlugin(container: Container): PolygonMaskInstance {
        return new PolygonMaskInstance(container);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IPolygonMaskOptions>): boolean {
        return options?.polygon?.enable ?? (options?.polygon?.type !== undefined && options.polygon.type !== Type.none);
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

export async function loadPolygonMaskPlugin(tsParticles: Main): Promise<void> {
    if (!isSsr() && !window.SVGPathSeg) {
        await import(
            /* webpackChunkName: "tsparticles.pathseg" */
            /* webpackMode: "lazy" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            "./pathseg"
        );
    }

    const plugin = new Plugin();

    await tsParticles.addPlugin(plugin);
}

export * from "./Enums";
