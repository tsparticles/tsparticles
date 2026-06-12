import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { ConnectLinks } from "./ConnectLinks.js";
import type { IConnect } from "../Interfaces/IConnect.js";

/** Connect mode options class */
export class Connect implements IConnect, IOptionLoader<IConnect> {
  /** Connect distance in pixels */
  distance = 80;
  /** Connect links options */
  readonly links = new ConnectLinks();
  /** Connect radius in pixels */
  radius = 60;

  /** @inheritDoc */
  load(data?: RecursivePartial<IConnect>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);

    this.links.load(data.links);

    loadProperty(this, "radius", data.radius);
  }
}
