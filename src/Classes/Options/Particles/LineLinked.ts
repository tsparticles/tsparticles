import {ILineLinked} from "../../../Interfaces/Options/Particles/ILineLinked";
import {Utils} from "../../Utils/Utils";
import {ILineLinkedShadow} from "../../../Interfaces/Options/Particles/ILineLinkedShadow";
import {LineLinkedShadow} from "./LineLinkedShadow";

export class LineLinked implements ILineLinked {
    public blink: boolean;
    public color: string;
    public consent: boolean;
    public distance: number;
    public enable: boolean;
    public opacity: number;
    public shadow: ILineLinkedShadow;
    public width: number;

    constructor() {
        this.blink = false;
        this.color = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = true;
        this.opacity = 1;
        this.shadow = new LineLinkedShadow();
        this.width = 1;
    }

    public load(data: ILineLinked): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.blink)) {
                this.blink = data.blink;
            }

            if (Utils.hasData(data.color)) {
                this.color = data.color;
            }

            if (Utils.hasData(data.consent)) {
                this.consent = data.consent;
            }

            if (Utils.hasData(data.distance)) {
                this.distance = data.distance;
            }

            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            if (Utils.hasData(data.opacity)) {
                this.opacity = data.opacity;
            }

            this.shadow.load(data.shadow);

            if (Utils.hasData(data.width)) {
                this.width = data.width;
            }
        }
    }
}
