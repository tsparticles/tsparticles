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

    public load(data: IBubble): void {
        this.distance = data.distance;
        this.duration = data.duration;
        this.opacity = data.opacity;
        this.size = data.size;
    }
}
