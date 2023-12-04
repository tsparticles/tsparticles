import type { FilterFunction } from "../../types.js";
import type { ISoundsAudio } from "./ISoundsAudio.js";
import type { ISoundsMelody } from "./ISoundsMelody.js";
import type { ISoundsNote } from "./ISoundsNote.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

export interface ISoundsEvent {
    audio?: SingleOrMultiple<ISoundsAudio | string>;

    event: SingleOrMultiple<string>;

    filter?: string | FilterFunction;

    melodies?: ISoundsMelody[];

    notes?: ISoundsNote[];
}
