import {ICoordinates} from "../../ICoordinates";

export interface IShadow {
    enable: boolean;
    color: string;
    blur: number;
    offset: ICoordinates;
}