import { type IOptionLoader, type RecursivePartial, type SingleOrMultiple, isNull } from "@tsparticles/engine";
import type { ISoundsNote } from "../Interfaces/ISoundsNote.js";

export class SoundsNote implements ISoundsNote, IOptionLoader<ISoundsNote> {
    duration: number;
    value: SingleOrMultiple<string>;

    constructor() {
        this.duration = 500;
        this.value = [];
    }

    load(data?: RecursivePartial<ISoundsNote>): void {
        if (isNull(data)) {
            return;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
