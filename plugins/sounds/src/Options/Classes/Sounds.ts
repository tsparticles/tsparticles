import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISounds } from "../Interfaces/ISounds.js";
import { SoundsEvent } from "./SoundsEvent.js";
import { SoundsIcons } from "./SoundsIcons.js";
import { SoundsVolume } from "./SoundsVolume.js";

/**
 * Sounds options class
 * [[include:Options/Plugins/Sounds.md]]
 */
export class Sounds implements ISounds, IOptionLoader<ISounds> {
  /** Enables auto play */
  autoPlay: boolean;
  /** Enables the sounds */
  enable;
  /** The sounds events */
  events: SoundsEvent[];
  /** The sounds icons */
  icons;
  /** The sounds volume */
  volume;

  constructor() {
    this.autoPlay = true;
    this.enable = false;
    this.events = [];
    this.icons = new SoundsIcons();
    this.volume = new SoundsVolume();
  }

  load(data?: RecursivePartial<ISounds>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "autoPlay", data.autoPlay);
    loadProperty(this, "enable", data.enable);

    if (data.events !== undefined) {
      this.events = data.events.map(t => {
        const event = new SoundsEvent();

        event.load(t);

        return event;
      });
    }

    this.icons.load(data.icons);

    if (data.volume !== undefined) {
      this.volume.load(data.volume);
    }
  }
}
