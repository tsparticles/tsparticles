import {IRepulse} from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data: IRepulse): void {
        this.distance = data.distance;
        this.duration = data.duration;
    }
}
