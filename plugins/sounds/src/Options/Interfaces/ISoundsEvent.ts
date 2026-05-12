import type { FilterFunction } from "../../types.js";
import type { ISoundsAudio } from "./ISoundsAudio.js";
import type { ISoundsMelody } from "./ISoundsMelody.js";
import type { ISoundsNote } from "./ISoundsNote.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/** The sounds event options */
export interface ISoundsEvent {
  /** The sounds event audio */
  audio?: SingleOrMultiple<ISoundsAudio | string>;

  /** The sounds event name */
  event: SingleOrMultiple<string>;

  /** The sounds event filter */
  filter?: string | FilterFunction;

  /** The sounds event melodies */
  melodies?: ISoundsMelody[];

  /** The sounds event notes */
  notes?: ISoundsNote[];
}
