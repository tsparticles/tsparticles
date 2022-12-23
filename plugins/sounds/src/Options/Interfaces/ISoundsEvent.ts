import type { FilterFunction } from "../../types";
import type { ISoundsMelody } from "./ISoundsMelody";
import type { ISoundsNote } from "./ISoundsNote";
import type { SingleOrMultiple } from "tsparticles-engine";

export interface ISoundsEvent {
    audio?: SingleOrMultiple<string>;

    event: SingleOrMultiple<string>;

    filter?: string | FilterFunction;

    melodies?: ISoundsMelody[];

    notes?: ISoundsNote[];
}
