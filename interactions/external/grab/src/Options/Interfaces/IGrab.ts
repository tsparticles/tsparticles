import type { IGrabLinks } from "./IGrabLinks.js";

/** The grab mode options */
export interface IGrab {
  /** The distance of the grab */
  distance: number;

  /** The grab links options */
  links: IGrabLinks;
}
