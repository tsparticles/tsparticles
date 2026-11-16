import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ISounds } from "../Interfaces/ISounds.js";
import { SoundsEvent } from "./SoundsEvent.js";
import { SoundsIcons } from "./SoundsIcons.js";
import { SoundsVolume } from "./SoundsVolume.js";

const minimumVoices = 1;

/**
 * Sounds options class
 * [[include:Options/Plugins/Sounds.md]]
 */
export class Sounds implements ISounds, IOptionLoader<ISounds> {
  /** Enables auto play */
  autoPlay = true;
  /** Enables the sounds */
  enable = false;
  /** The sounds events */
  events: SoundsEvent[] = [];
  /** The sounds icons */
  readonly icons = new SoundsIcons();
  /** The maximum number of concurrent sound sources */
  maxVoices = 32;
  /** The sounds volume */
  readonly volume = new SoundsVolume();

  load(data?: RecursivePartial<ISounds>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "autoPlay", data.autoPlay);
    loadProperty(this, "enable", data.enable);

    if (data.maxVoices !== undefined && Number.isFinite(data.maxVoices)) {
      this.maxVoices = Math.max(minimumVoices, Math.floor(data.maxVoices));
    }

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
