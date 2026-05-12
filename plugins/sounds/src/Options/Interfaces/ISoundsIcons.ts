import type { ISoundsIcon } from "./ISoundsIcon.js";

/** The sounds icons options */
export interface ISoundsIcons {
  /** Enables the sounds icons */
  enable: boolean;
  /** The mute icon */
  mute: ISoundsIcon;
  /** The unmute icon */
  unmute: ISoundsIcon;
  /** The volume down icon */
  volumeDown: ISoundsIcon;
  /** The volume up icon */
  volumeUp: ISoundsIcon;
}
