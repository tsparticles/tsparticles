import type { ISoundsNote } from "./ISoundsNote.js";

export interface ISoundsMelody {
    loop: boolean;
    melodies: ISoundsMelody[];
    notes: ISoundsNote[];
}
