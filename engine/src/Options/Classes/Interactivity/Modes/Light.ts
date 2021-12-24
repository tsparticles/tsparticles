import type { ILight } from "../../../Interfaces/Interactivity/Modes/ILight";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { LightArea } from "./LightArea";
import { LightShadow } from "./LightShadow";

export class Light implements ILight, IOptionLoader<ILight> {
    area;
    shadow;

    constructor() {
        this.area = new LightArea();
        this.shadow = new LightShadow();
    }

    load(data?: RecursivePartial<ILight>): void {
        if (!data) {
            return;
        }

        this.area.load(data.area);
        this.shadow.load(data.shadow);
    }
}
