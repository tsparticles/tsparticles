import {
    type IOptionLoader,
    type RecursivePartial,
    type SingleOrMultiple,
    isArray,
    isFunction,
    isString,
} from "@tsparticles/engine";
import type { FilterFunction } from "../../types.js";
import type { ISoundsEvent } from "../Interfaces/ISoundsEvent.js";
import { SoundsAudio } from "./SoundsAudio.js";
import { SoundsMelody } from "./SoundsMelody.js";
import { SoundsNote } from "./SoundsNote.js";

export class SoundsEvent implements ISoundsEvent, IOptionLoader<ISoundsEvent> {
    audio?: SingleOrMultiple<SoundsAudio>;

    event: SingleOrMultiple<string>;

    filter?: FilterFunction;

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
            if (isArray(data.audio)) {
                this.audio = data.audio.map(s => {
                    const tmp = new SoundsAudio();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                this.audio = new SoundsAudio();

                this.audio.load(data.audio);
            }
        }

        if (data.notes !== undefined) {
            this.notes = data.notes.map(t => {
                const tmp = new SoundsNote();

                tmp.load(t);

                return tmp;
            });
        }

        if (data.melodies !== undefined) {
            this.melodies = data.melodies.map(t => {
                const tmp = new SoundsMelody();

                tmp.load(t);

                return tmp;
            });
        }

        if (data.filter) {
            if (isString(data.filter)) {
                const filterFunc = (window as unknown as Record<string, unknown>)[data.filter];

                if (isFunction(filterFunc)) {
                    this.filter = filterFunc as FilterFunction;
                }
            } else {
                this.filter = data.filter;
            }
        }
    }
}
