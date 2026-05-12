import type { SingleOrMultiple } from "@tsparticles/engine";

/** The sounds note options */
export interface ISoundsNote {
  /** The note duration */
  duration: number;

  /** The note value */
  value: SingleOrMultiple<string>;
}
