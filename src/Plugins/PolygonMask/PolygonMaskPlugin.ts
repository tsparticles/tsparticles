import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { tsParticles } from "../../index.slim";
import { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";

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
}

const plugin = new PolygonMaskPlugin();

tsParticles.addPlugin(plugin);

export { IPolygonMaskOptions, plugin as PolygonMaskPlugin };
export * from "./Enums";
