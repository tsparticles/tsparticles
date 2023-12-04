import type { ProcessBubbleType } from "./Enums.js";

/**
 */
export interface Interfaces {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}

/**
 */
export interface IBubblerProcessParamObj {
    optValue?: number;
    value?: number;
}
