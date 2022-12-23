import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISoundsMelody } from "../Interfaces/ISoundsMelody";
import { SoundsNote } from "./SoundsNote";

export class SoundsMelody implements ISoundsMelody, IOptionLoader<ISoundsMelody> {
    notes: SoundsNote[];

    constructor() {
        this.notes = [];
    }

    load(data?: RecursivePartial<ISoundsMelody>): void {
        if (data === undefined) {
            return;
        }

        if (data.notes !== undefined) {
            this.notes = data.notes.map((s) => {
                const tmp = new SoundsNote();

                tmp.load(s);

                return tmp;
            });
        }
    }
}
