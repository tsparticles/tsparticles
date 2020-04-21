import type { ILineLinked } from "../../../../Interfaces/Options/Particles/LineLinked/ILineLinked";
import type { ILineLinkedShadow } from "../../../../Interfaces/Options/Particles/LineLinked/ILineLinkedShadow";
import { LineLinkedShadow } from "./LineLinkedShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionsColor } from "../../../../Interfaces/Options/Particles/IOptionsColor";
import { OptionsColor } from "../OptionsColor";

export class LineLinked implements ILineLinked {
    public blink: boolean;
    public color: IOptionsColor;
    public consent: boolean;
    public distance: number;
    public enable: boolean;
    public opacity: number;
    public shadow: ILineLinkedShadow;
    public width: number;

    constructor() {
        this.blink = false;
        this.color = new OptionsColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.opacity = 1;
        this.shadow = new LineLinkedShadow();
        this.width = 1;
    }

    public load(data?: RecursivePartial<ILineLinked>): void {
        if (data !== undefined) {
            if (data.blink !== undefined) {
                this.blink = data.blink;
            }

            this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);

            if (data.consent !== undefined) {
                this.consent = data.consent;
            }

            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }

            this.shadow.load(data.shadow);

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
