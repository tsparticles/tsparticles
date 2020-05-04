import { IPluginManager } from "../../Core/Interfaces/IPluginManager";
import { PolygonMask } from "./PolygonMask";
import { Container } from "../../Core/Container";

export class PolygonMaskPlugin implements IPluginManager {
    readonly id: string;

    constructor() {
        this.id = "polygonMask";
    }

    getPlugin(container: Container): PolygonMask {
        return new PolygonMask(container);
    }

    needsPlugin(container: Container): boolean {
        const options = container.options;

        return options.polygon.enable;
    }

}