import type { ILineLinked } from "../../../Interfaces/Particles/LineLinked/ILineLinked";
import { LineLinkedShadow } from "./LineLinkedShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../OptionsColor";

export class LineLinked implements ILineLinked {
    public blink: boolean;
    public color: OptionsColor;
    public consent: boolean;
    public distance: number;
    public enable: boolean;
    public opacity: number;
    public shadow: LineLinkedShadow;
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

            this.color = OptionsColor.create(this.color, data.color);

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
