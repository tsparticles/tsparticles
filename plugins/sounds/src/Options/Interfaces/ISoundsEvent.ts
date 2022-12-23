import type { ISoundsMelody } from "./ISoundsMelody";
import type { ISoundsNote } from "./ISoundsNote";
import type { SingleOrMultiple } from "tsparticles-engine";

export interface ISoundsEvent {
    audio?: SingleOrMultiple<string>;

    event: SingleOrMultiple<string>;

    melodies?: ISoundsMelody[];

    notes?: ISoundsNote[];
}
