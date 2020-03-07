import {ILineLinked} from "../../../Interfaces/Options/Particles/ILineLinked";

export class LineLinked implements ILineLinked {
    public blink: boolean;
    public color: string;
    public consent: boolean;
    public distance: number;
    public enable: boolean;
    public opacity: number;
    public width: number;

    constructor() {
        this.blink = false;
        this.color = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = true;
        this.opacity = 1;
        this.width = 1;
    }
}
