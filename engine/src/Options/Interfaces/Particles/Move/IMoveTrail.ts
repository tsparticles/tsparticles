import type { IMoveTrailFill } from "./IMoveTrailFill";

/**
 */
export interface IMoveTrail {
    enable: boolean;

    fill: IMoveTrailFill;

    length: number;
}
