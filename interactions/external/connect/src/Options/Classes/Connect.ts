import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { ConnectLinks } from "./ConnectLinks.js";
import type { IConnect } from "../Interfaces/IConnect.js";

/** Connect mode options class */
export class Connect implements IConnect, IOptionLoader<IConnect> {
  /** Connect distance in pixels */
  distance;

  /** Connect links options */
  links;

  /** Connect radius in pixels */
  radius;

  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IConnect>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load(data.links);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
