import type { IBubbleBase } from "../../../Interfaces/Interactivity/Modes/IBubbleBase";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export abstract class BubbleBase implements IBubbleBase {
    public distance: number;
    public duration: number;
    public opacity?: number;
    public size?: number;
    public color?: SingleOrMultiple<OptionsColor>;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data?: RecursivePartial<IBubbleBase>): void {
        if (data === undefined) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        if (data.color !== undefined) {
            if (data.color instanceof Array) {
                this.color = data.color.map((s) => OptionsColor.create(undefined, s));
            } else {
                if (this.color instanceof Array) {
                    this.color = new OptionsColor();
                }

                this.color = OptionsColor.create(this.color, data.color);
            }
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}
