import type { IEvents } from "./Events/IEvents";
import type { IModes } from "./Modes/IModes";
import type { InteractivityDetect } from "../../../Enums";

/**
 * Particles interactivity options
 * [[include:Options/Interactivity.md]]
 * @category Options
 */
export interface IInteractivity {
    /**
     * Where the mouse events will be detected
     * If set to `canvas` only the particles canvas will be targeted
     * If set to `parent` only the particles canvas parent will be targeted
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
