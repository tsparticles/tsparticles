import type { Container } from "../../../Core/Container";
import type { Engine } from "../../../engine";
import { Events } from "./Events/Events";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect";
import { Modes } from "./Modes/Modes";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

/**
 * [[include:Options/Interactivity.md]]
 * @category Options
 */
export class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    [name: string]: unknown;

    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;

    events;
    modes;

    constructor(engine: Engine, container?: Container) {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes(engine, container);
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     */
    get detect_on(): InteractivityDetect | keyof typeof InteractivityDetect {
        return this.detectsOn;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new detectsOn
     * @param value
     */
    set detect_on(value: InteractivityDetect | keyof typeof InteractivityDetect) {
        this.detectsOn = value;
    }

    load(data?: RecursivePartial<IInteractivity>): void {
        if (!data) {
            return;
        }

        const detectsOn = data.detectsOn ?? data.detect_on;

        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }

        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}
