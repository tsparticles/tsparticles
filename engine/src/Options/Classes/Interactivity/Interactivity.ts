import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import { InteractivityDetect } from "../../../Enums";
import { Events } from "./Events/Events";
import { Modes } from "./Modes/Modes";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Interactivity.md]]
 * @category Options
 */
export class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;
    events;
    modes;

    constructor() {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes();
    }

    load(data?: RecursivePartial<IInteractivity>): void {
        if (!data) {
            return;
        }

        if (data.detectsOn !== undefined) {
            this.detectsOn = data.detectsOn;
        }

        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}
