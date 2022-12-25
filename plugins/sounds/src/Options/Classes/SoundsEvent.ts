import type { IOptionLoader, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { FilterFunction } from "../../types";
import type { ISoundsEvent } from "../Interfaces/ISoundsEvent";
import { SoundsAudio } from "./SoundsAudio";
import { SoundsMelody } from "./SoundsMelody";
import { SoundsNote } from "./SoundsNote";

declare global {
    interface Window {
        [key: string]: unknown;
    }
}

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
            if (data.audio instanceof Array) {
                this.audio = data.audio.map((s) => {
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

        if (data.filter !== undefined) {
            if (typeof data.filter === "string") {
                if (typeof window[data.filter] === "function") {
                    this.filter = window[data.filter] as FilterFunction;
                }
            } else {
                this.filter = data.filter;
            }
        }
    }
}
