import type { ISoundsNote } from "./ISoundsNote";
import type { SingleOrMultiple } from "tsparticles-engine";

export interface ISoundsEvent {
    event: SingleOrMultiple<string>;

    notes: ISoundsNote[];
}
