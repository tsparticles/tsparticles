import type { ILight } from "../../../Interfaces/Interactivity/Modes/ILight";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { LightArea } from "./LightArea";
import { LightShadow } from "./LightShadow";

export class Light implements ILight, IOptionLoader<ILight> {
    public light: LightArea;
    public shadow: LightShadow;

    constructor() {
        this.light = new LightArea();
        this.shadow = new LightShadow();
    }

    public load(data?: RecursivePartial<ILight>): void {
        if (data === undefined) {
            return;
        }

        this.light.load(data.light);
        this.shadow.load(data.shadow);
    }
}
