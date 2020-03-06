import {IShadow} from "../../../Interfaces/Options/Particles/IShadow";
import {ICoordinates} from "../../../Interfaces/ICoordinates";

export class Shadow implements IShadow {
    public blur: number;
    public color: string;
    public enable: boolean;
    public offset: ICoordinates;

    constructor() {
        this.blur = 0;
        this.color = "#000000";
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
    }
}
