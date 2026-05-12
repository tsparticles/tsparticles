import type { ISoundsNote } from "./ISoundsNote.js";

/** The sounds melody options */
export interface ISoundsMelody {
  /** Enables loop */
  loop: boolean;
  /** The nested melodies */
  melodies: ISoundsMelody[];
  /** The melody notes */
  notes: ISoundsNote[];
}
