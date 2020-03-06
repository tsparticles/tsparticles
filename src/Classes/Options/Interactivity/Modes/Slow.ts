import { ISlow } from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";

export class Slow implements ISlow {
    public active: boolean;
    public radius: number;
    public factor: number;

    constructor() {
        this.active = false;
        this.radius = 0;
        this.factor = 1;
    }
}
