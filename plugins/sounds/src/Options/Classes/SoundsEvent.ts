import type { IOptionLoader, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { ISoundsEvent } from "../Interfaces/ISoundsEvent";
import { SoundsMelody } from "./SoundsMelody";
import { SoundsNote } from "./SoundsNote";

export class SoundsEvent implements ISoundsEvent, IOptionLoader<ISoundsEvent> {
    audio?: SingleOrMultiple<string>;

    event: SingleOrMultiple<string>;

    melodies?: SoundsMelody[];

    notes?: SoundsNote[];

    constructor() {
        this.event = [];
        this.notes = [];
    }

    load(data?: RecursivePartial<ISoundsEvent>): void {
        if (!data) {
            return;
        }

        if (data.event !== undefined) {
            this.event = data.event;
        }

        if (data.audio !== undefined) {
            this.audio = data.audio;
        }

        if (data.notes !== undefined) {
            this.notes = data.notes.map((t) => {
                const tmp = new SoundsNote();

                tmp.load(t);

                return tmp;
            });
        }

        if (data.melodies !== undefined) {
            this.melodies = data.melodies.map((t) => {
                const tmp = new SoundsMelody();

                tmp.load(t);

                return tmp;
            });
        }
    }
}
