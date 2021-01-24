import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";

export interface ISpin {
    acceleration: number;
    enable: boolean;
    position?: ICoordinates;
}
