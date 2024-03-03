import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { ISoundsMelody } from "../Interfaces/ISoundsMelody.js";
import { SoundsNote } from "./SoundsNote.js";

export class SoundsMelody implements ISoundsMelody, IOptionLoader<ISoundsMelody> {
    loop;
    melodies: SoundsMelody[];
    notes: SoundsNote[];

    constructor() {
        this.loop = false;
        this.melodies = [];
        this.notes = [];
    }

    load(data?: RecursivePartial<ISoundsMelody>): void {
        if (data === undefined) {
            return;
        }

        if (data.loop !== undefined) {
            this.loop = data.loop;
        }

        if (data.melodies !== undefined) {
            this.melodies = data.melodies.map(s => {
                const tmp = new SoundsMelody();

                tmp.load(s);

                return tmp;
            });
        }

        if (data.notes !== undefined) {
            this.notes = data.notes.map(s => {
                const tmp = new SoundsNote();

                tmp.load(s);

                return tmp;
            });
        }
    }
}
