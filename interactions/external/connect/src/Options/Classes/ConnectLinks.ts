import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IConnectLinks } from "../Interfaces/IConnectLinks.js";

/** Connect links options class */
export class ConnectLinks implements IConnectLinks, IOptionLoader<IConnectLinks> {
  /** Connect line opacity */
  opacity;

  constructor() {
    this.opacity = 0.5;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IConnectLinks>): void {
    if (isNull(data)) {
      return;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
