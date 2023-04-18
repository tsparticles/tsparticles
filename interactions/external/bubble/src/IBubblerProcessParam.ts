import type { ProcessBubbleType } from "./ProcessBubbleType";

/**
 */
export interface IBubblerProcessParam {
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
