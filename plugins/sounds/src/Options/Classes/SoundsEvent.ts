import type { IOptionLoader, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { ISoundsEvent } from "../Interfaces/ISoundsEvent";
import { SoundsNote } from "./SoundsNote";

export class SoundsEvent implements ISoundsEvent, IOptionLoader<ISoundsEvent> {
    event: SingleOrMultiple<string>;
    notes: SoundsNote[];

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

        if (data.notes !== undefined) {
            this.notes = data.notes.map((t) => {
                const tmp = new SoundsNote();

                tmp.load(t);

                return tmp;
            });
        }
    }
}
