import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { IBubbleDiv } from "../../../Interfaces/Interactivity/Modes/IBubbleDiv";

export class BubbleDiv implements IBubbleDiv {
    public ids: SingleOrMultiple<string>;
    public distance: number;
    public duration: number;
    public opacity?: number;
    public size?: number;
    public color?: SingleOrMultiple<OptionsColor>;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.ids = [];
    }

    public load(data?: RecursivePartial<IBubbleDiv>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }

            if (data.ids !== undefined) {
                this.ids = data.ids;
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
}
