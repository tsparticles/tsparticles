import type { Container } from "../../../Core/Container.js";
import type { Engine } from "../../../Core/Engine.js";
import { Events } from "./Events/Events.js";
import type { IInteractivity } from "../../Interfaces/Interactivity/IInteractivity.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { InteractivityDetect } from "../../../Enums/InteractivityDetect.js";
import { Modes } from "./Modes/Modes.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Interactivity.md]]
 */
export class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
    [name: string]: unknown;

    detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;

    readonly events;
    readonly modes;

    constructor(engine: Engine, container?: Container) {
        this.detectsOn = InteractivityDetect.window;
        this.events = new Events();
        this.modes = new Modes(engine, container);
    }

    load(data?: RecursivePartial<IInteractivity>): void {
        if (!data) {
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
