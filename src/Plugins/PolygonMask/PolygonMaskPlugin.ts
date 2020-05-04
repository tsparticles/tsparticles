import { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMask } from "./PolygonMask";
import { Container } from "../../Core/Container";

export class PolygonMaskPlugin implements IPlugin {
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