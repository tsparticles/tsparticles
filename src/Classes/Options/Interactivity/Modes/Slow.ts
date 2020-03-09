import {ISlow} from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";

export class Slow implements ISlow {
    public active: boolean;
    public factor: number;
    public radius: number;

    constructor() {
        this.active = false;
        this.factor = 1;
        this.radius = 0;
    }

    public load(data: ISlow): void {
        this.active = data.active;
        this.factor = data.factor;
        this.radius = data.radius;
    }
}
