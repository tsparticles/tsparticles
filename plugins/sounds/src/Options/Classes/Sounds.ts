import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISounds } from "../Interfaces/ISounds";
import { SoundsEvent } from "./SoundsEvent";
import { SoundsIcons } from "./SoundsIcons";
import { SoundsVolume } from "./SoundsVolume";

export class Sounds implements ISounds, IOptionLoader<ISounds> {
    enable;
    events: SoundsEvent[];
    icons;
    volume;

    constructor() {
        this.enable = false;
        this.events = [];
        this.icons = new SoundsIcons();
        this.volume = new SoundsVolume();
    }

    load(data?: RecursivePartial<ISounds>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.events !== undefined) {
            this.events = data.events.map((t) => {
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
