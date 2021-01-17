import type { ProcessBubbleType } from "../../Enums";

/**
 * @category Interfaces
 */
export interface IBubblerProcessParam {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}

/**
 * @category Interfaces
 */
export interface IBubblerProcessParamObj {
    optValue?: number;
    value?: number;
}
