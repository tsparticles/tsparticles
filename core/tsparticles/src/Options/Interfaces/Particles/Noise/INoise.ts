import type { IOptionLoader } from "../../IOptionLoader";
import type { INoiseDelay } from "./INoiseDelay";

export interface INoise extends IOptionLoader<INoise> {
    delay: INoiseDelay;
    enable: boolean;
}
