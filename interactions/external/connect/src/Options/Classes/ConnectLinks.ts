import { type IOptionLoader, type RecursivePartial, isNull, loadRangeProperty } from "@tsparticles/engine";
import type { IConnectLinks } from "../Interfaces/IConnectLinks.js";

/** Connect links options class */
export class ConnectLinks implements IConnectLinks, IOptionLoader<IConnectLinks> {
  /** Connect line opacity */
  opacity = 0.5;

  load(data?: RecursivePartial<IConnectLinks>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "opacity", data.opacity);
  }
}
