import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { GrabLinks } from "./GrabLinks.js";
import type { IGrab } from "../Interfaces/IGrab.js";

/** Grab mode options class */
export class Grab implements IGrab, IOptionLoader<IGrab> {
  /** Grab distance in pixels */
  distance;

  /** Grab links options */
  links;

  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IGrab>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load(data.links);
  }
}
