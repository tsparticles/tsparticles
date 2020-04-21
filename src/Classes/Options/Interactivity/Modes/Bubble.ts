import type { IBubble } from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { IOptionsColor } from "../../../../Interfaces/Options/Particles/IOptionsColor";
import { OptionsColor } from "../../Particles/OptionsColor";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export class Bubble implements IBubble {
    public distance: number;
    public duration: number;
    public opacity?: number;
    public size?: number;
    public color?: SingleOrMultiple<IOptionsColor>;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data?: RecursivePartial<IBubble>): void {
        if (data !== undefined) {
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
                    this.color = data.color.map((s) => {
                        const tmp = new OptionsColor();

                        tmp.load(typeof s === "string" ? { value: s } : s);

                        return tmp;
                    });
                } else {
                    if (this.color instanceof Array || this.color === undefined) {
                        this.color = new OptionsColor();
                    }

                    this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);
                }
            }

            if (data.size !== undefined) {
                this.size = data.size;
            }
        }
    }
}
