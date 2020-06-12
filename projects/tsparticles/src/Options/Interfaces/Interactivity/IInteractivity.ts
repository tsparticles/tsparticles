import type { InteractivityDetect } from "../../../Enums";
import type { IEvents } from "./Events/IEvents";
import type { IModes } from "./Modes/IModes";
import type { IOptionLoader } from "../IOptionLoader";

export interface IInteractivity extends IOptionLoader<IInteractivity> {
    /**
     * @deprecated use the new detectsOn instead
     */
    detect_on: InteractivityDetect;

    detectsOn: InteractivityDetect;
    events: IEvents;
    modes: IModes;
}
