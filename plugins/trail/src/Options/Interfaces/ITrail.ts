import type { ITrailFill } from "./ITrailFill.js";

/**
 */
export interface ITrail {
    enable: boolean;

    fill: ITrailFill;

    length: number;
}
