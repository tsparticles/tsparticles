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

    public load(data: ILineLinked): void {
        this.blink = data.blink;
        this.color = data.color;
        this.consent = data.consent;
        this.distance = data.distance;
        this.enable = data.enable;
        this.opacity = data.opacity;
        this.width = data.width;
    }
}
