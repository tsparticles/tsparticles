import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { Events } from "./Events/Events.js";
import type { IInteractivity } from "../Interfaces/IInteractivity.js";
import { InteractivityDetect } from "../../Enums/InteractivityDetect.js";
import type { InteractivityPluginManager } from "../../types.js";
import { Modes } from "./Modes/Modes.js";

/**
 * [[include:Options/Interactivity.md]]
 */
export class Interactivity implements IInteractivity, IOptionLoader<IInteractivity> {
  [name: string]: unknown;

  detectsOn: InteractivityDetect | keyof typeof InteractivityDetect;

  readonly events;
  readonly modes;

  constructor(pluginManager: InteractivityPluginManager, containerId?: symbol) {
    this.detectsOn = InteractivityDetect.window;
    this.events = new Events();
    this.modes = new Modes(pluginManager, containerId);
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
