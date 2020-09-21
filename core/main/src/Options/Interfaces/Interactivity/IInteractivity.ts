import type { InteractivityDetect } from "../../../Enums";
import type { IEvents } from "./Events/IEvents";
import type { IModes } from "./Modes/IModes";

/**
 * Particles interactivity options
 * [[include:Options/Interactivity.md]]
 * @category Options
 */
export interface IInteractivity {
    /**
     * @deprecated use the new detectsOn instead
     */
    detect_on: InteractivityDetect | keyof typeof InteractivityDetect;

    /**
     * Where the mouse events will be detected
     * If set to `canvas` only the particles canvas will be target
     * If set to `parent` only the particles canvas parent will be the target
     * If set to `window` every area will be the target
     */
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;

    /**
     * Interaction events options, this configures which events are enabled and which modes should be used
     */
    events: IEvents;

    /**
     * Interaction modes options, this configures every mode behavior
     */
    modes: IModes;
}
