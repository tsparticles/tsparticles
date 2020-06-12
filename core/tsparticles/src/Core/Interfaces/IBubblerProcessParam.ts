import type { ProcessBubbleType } from "../../Enums";
import type { IBubblerProcessParamObj } from "./IBubblerProcessParamObj";

export interface IBubblerProcessParam {
    bubbleObj: IBubblerProcessParamObj;
    particlesObj: IBubblerProcessParamObj;
    type: ProcessBubbleType;
}
