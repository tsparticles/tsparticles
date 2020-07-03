import type { IColor } from "../../../Core/Interfaces/IColor";

export interface ITrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
