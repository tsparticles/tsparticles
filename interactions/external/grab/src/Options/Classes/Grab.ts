import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks.js";
import type { IGrab } from "../Interfaces/IGrab.js";

/** Grab mode options class */
export class Grab implements IGrab, IOptionLoader<IGrab> {
  /** Grab distance in pixels */
  distance = 100;
  /** Grab links options */
  readonly links = new GrabLinks();

  load(data?: RecursivePartial<IGrab>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);

    this.links.load(data.links);
  }
}
