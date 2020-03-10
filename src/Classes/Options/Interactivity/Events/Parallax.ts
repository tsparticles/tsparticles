import {IParallax} from "../../../../Interfaces/Options/Interactivity/Events/IParallax";

export class Parallax implements IParallax {
    public enable: boolean;
    public force: number;
    public smooth: number;

    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }
}
