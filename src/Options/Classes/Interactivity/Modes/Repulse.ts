import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { RepulseDiv } from "./RepulseDiv";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;
    public speed: number;
    public divs?: SingleOrMultiple<RepulseDiv>;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }

    public load(data?: RecursivePartial<IRepulse>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }

            if (data.speed !== undefined) {
                this.speed = data.speed;
            }

            if (data.divs !== undefined) {
                if (data.divs instanceof Array) {
                    this.divs = data.divs.map((s) => {
                        const tmp = new RepulseDiv();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.divs instanceof Array || !this.divs) {
                        this.divs = new RepulseDiv();
                    }

                    this.divs.load(data.divs);
                }
            }
        }
    }
}
