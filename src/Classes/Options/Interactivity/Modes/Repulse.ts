import {IRepulse} from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }
}
