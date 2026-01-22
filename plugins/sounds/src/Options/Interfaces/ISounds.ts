import type { ISoundsEvent } from "./ISoundsEvent.js";
import type { ISoundsIcons } from "./ISoundsIcons.js";
import type { ISoundsVolume } from "./ISoundsVolume.js";

export interface ISounds {
  autoPlay: boolean;

  enable: boolean;

  events: ISoundsEvent[];

  icons: ISoundsIcons;

  volume: ISoundsVolume | number;
}
