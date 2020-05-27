import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { tsParticles } from "../../index.slim";
import { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";
import { Options } from "../../Options/Classes/Options";
import { PolygonMask } from "./Options/Classes/PolygonMask";

class PolygonMaskPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "polygonMask";
    }

    public getPlugin(container: Container): PolygonMaskInstance {
        return new PolygonMaskInstance(container);
    }

    public needsPlugin(options?: RecursivePartial<IOptions & IPolygonMaskOptions>): boolean {
        return options?.polygon?.enable ?? false;
    }

    public loadOptions(options: Options, source?: RecursivePartial<IOptions & IPolygonMaskOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IPolygonMaskOptions;
        if (optionsCast.polygon === undefined) {
            optionsCast.polygon = new PolygonMask();
        }

        optionsCast.polygon.load(source?.polygon);
    }
}

const plugin = new PolygonMaskPlugin();

export { IPolygonMaskOptions, plugin as PolygonMaskPlugin };
export * from "./Enums";
