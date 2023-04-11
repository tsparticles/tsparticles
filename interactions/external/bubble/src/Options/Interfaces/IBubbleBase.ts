import type { IOptionsColor, SingleOrMultiple } from "tsparticles-engine";

/**
 
 */
export interface IBubbleBase {
    color?: SingleOrMultiple<string | IOptionsColor>;
    distance: number;
    duration: number;
    mix: boolean;
    opacity?: number;
    size?: number;
}
