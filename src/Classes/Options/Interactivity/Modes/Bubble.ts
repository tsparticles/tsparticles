import {IBubble} from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";

export class Bubble implements IBubble {
    public distance: number;
    public duration: number;
    public opacity: number;
    public size: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.opacity = 1;
        this.size = 80;
    }
}
