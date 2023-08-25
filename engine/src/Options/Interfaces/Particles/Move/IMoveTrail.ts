import type { IMoveTrailFill } from "./IMoveTrailFill.js";

/**
 */
export interface IMoveTrail {
    enable: boolean;

    fill: IMoveTrailFill;

    length: number;
}
