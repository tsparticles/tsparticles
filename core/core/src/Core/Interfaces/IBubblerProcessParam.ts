import type { ProcessBubbleType } from "../../Enums";
import type { IBubblerProcessParamObj } from "./IBubblerProcessParamObj";

/**
 * @category Interfaces
 */
export interface IBubblerProcessParam {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}
