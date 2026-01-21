import { type Container, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { Events } from "./Events/Events.js";
import type { IInteractivity } from "../Interfaces/IInteractivity.js";
import { InteractivityDetect } from "../../InteractivityDetect.js";
import type { InteractivityEngine } from "../../types.js";
import { Modes } from "./Modes/Modes.js";

/**
 * [[include:Options/Interactivity.md]]
 */
export class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    [name: string]: unknown;

    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;

    readonly events;
    readonly modes;

    constructor(engine: InteractivityEngine, container?: Container) {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes(engine, container);
    }

    load(data?: RecursivePartial<IInteractivity>): void {
        if (isNull(data)) {
            return;
        }

        const detectsOn = data.detectsOn;

        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }

        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}
