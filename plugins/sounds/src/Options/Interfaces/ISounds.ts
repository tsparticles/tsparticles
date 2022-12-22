import type { ISoundsEvent } from "./ISoundsEvent";
import type { ISoundsIcons } from "./ISoundsIcons";

export interface ISounds {
    enable: boolean;

    events: ISoundsEvent[];

    icons: ISoundsIcons;

    volume: number;
}
