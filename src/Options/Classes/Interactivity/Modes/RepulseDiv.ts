import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IRepulseDiv } from "../../../Interfaces/Interactivity/Modes/IRepulseDiv";

export class RepulseDiv implements IRepulseDiv {
    public ids: SingleOrMultiple<string>;
    public distance: number;
    public duration: number;
    public speed: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.ids = [];
        this.speed = 1;
    }

    public load(data?: RecursivePartial<IRepulseDiv>): void {
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

            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
        }
    }
}
