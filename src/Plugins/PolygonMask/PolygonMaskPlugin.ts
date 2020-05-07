import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMask } from "./PolygonMask";
import type { Container } from "../../Core/Container";

export class PolygonMaskPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "polygonMask";
    }

    public getPlugin(container: Container): PolygonMask {
        return new PolygonMask(container);
    }

    public needsPlugin(container: Container): boolean {
        const options = container.options;

        return options.polygon.enable;
    }
}
