import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { ISounds } from "../Interfaces/ISounds.js";
import { SoundsEvent } from "./SoundsEvent.js";
import { SoundsIcons } from "./SoundsIcons.js";
import { SoundsVolume } from "./SoundsVolume.js";

export class Sounds implements ISounds, IOptionLoader<ISounds> {
    autoPlay: boolean;
    enable;
    events: SoundsEvent[];
    icons;
    volume;

    constructor() {
        this.autoPlay = true;
        this.enable = false;
        this.events = [];
        this.icons = new SoundsIcons();
        this.volume = new SoundsVolume();
    }

    load(data?: RecursivePartial<ISounds>): void {
        if (!data) {
            return;
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
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
