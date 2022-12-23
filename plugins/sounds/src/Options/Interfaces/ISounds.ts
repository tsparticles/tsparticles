import type { ISoundsEvent } from "./ISoundsEvent";
import type { ISoundsIcons } from "./ISoundsIcons";
import type { ISoundsVolume } from "./ISoundsVolume";

export interface ISounds {
    enable: boolean;

    events: ISoundsEvent[];

    icons: ISoundsIcons;

    volume: ISoundsVolume | number;
}
