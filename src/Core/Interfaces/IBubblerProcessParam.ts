import type { ProcessBubbleType } from "../../Enums/ProcessBubbleType";
import type { IBubblerProcessParamObj } from "./IBubblerProcessParamObj";

export interface IBubblerProcessParam {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}
