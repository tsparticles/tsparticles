import type { ISoundsEvent } from "./ISoundsEvent.js";
import type { ISoundsIcons } from "./ISoundsIcons.js";
import type { ISoundsVolume } from "./ISoundsVolume.js";

/** The sounds options */
export interface ISounds {
  /** Enables auto play */
  autoPlay: boolean;

  /** Enables the sounds */
  enable: boolean;

  /** The sounds events */
  events: ISoundsEvent[];

  /** The sounds icons */
  icons: ISoundsIcons;

  /** The sounds volume */
  volume: ISoundsVolume | number;
}
