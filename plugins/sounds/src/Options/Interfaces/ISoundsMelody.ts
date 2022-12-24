import type { ISoundsNote } from "./ISoundsNote";

export interface ISoundsMelody {
    loop: boolean;
    melodies: ISoundsMelody[];
    notes: ISoundsNote[];
}
