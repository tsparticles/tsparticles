import type { IConnectLinks } from "./IConnectLinks.js";

/** The connect mode options */
export interface IConnect {
  /** The connect distance */
  distance: number;
  /** The connect links options */
  links: IConnectLinks;
  /** The connect radius */
  radius: number;
}
