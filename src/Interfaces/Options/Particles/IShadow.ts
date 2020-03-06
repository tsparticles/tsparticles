import {ICoordinates} from "../../ICoordinates";

export interface IShadow {
    blur: number;
    color: string;
    enable: boolean;
    offset: ICoordinates;
}
