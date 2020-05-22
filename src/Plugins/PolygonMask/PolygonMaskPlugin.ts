import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask";

type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};

export class PolygonMaskPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "polygonMask";
    }

    public getPlugin(container: Container): PolygonMaskInstance {
        return new PolygonMaskInstance(container);
    }

    public needsPlugin(options?: RecursivePartial<IPolygonMaskOptions>): boolean {
        return options?.polygon?.enable ?? false;
    }
}
