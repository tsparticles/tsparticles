import type { Container, CustomEventArgs, IOptions, Options } from "@tsparticles/engine";
import type { ISounds } from "./Options/Interfaces/ISounds.js";
import type { ImageDisplay } from "./enums.js";
import type { Sounds } from "./Options/Classes/Sounds.js";
import type { SoundsIcon } from "./Options/Classes/SoundsIcon.js";

/** Filter function for sound events */
export type FilterFunction = (args: CustomEventArgs) => boolean;

/** Sounds plugin options interface */
export type ISoundsOptions = IOptions & {
  /** The sounds options */
  sounds?: ISounds;
};

/** Sounds plugin options class */
export type SoundsOptions = Options & {
  /** The sounds options */
  sounds?: Sounds;
};

/** Sounds container with audio context */
export type SoundsContainer = Container & {
  /** The actual sounds options */
  actualOptions: SoundsOptions;
  /** The audio context for sound playback */
  audioContext?: AudioContext;
  /** Whether the audio is muted */
  muted?: boolean;
};

/** Image margins for sound icons */
export interface ImageMargins {
  /** The right margin */
  right: number;
  /** The top margin */
  top: number;
}

/** Initialization data for sound icon images */
export interface InitImageData {
  /** Click callback for the icon */
  clickCb: () => Promise<void>;
  /** The sounds container */
  container: SoundsContainer;
  /** The image display type */
  display: ImageDisplay;
  /** The icon options */
  iconOptions: SoundsIcon;
  /** The icon margin */
  margin: number;
  /** The particles options */
  options: Options;
  /** The icon position */
  pos: ImageMargins;
  /** The right offsets for icon positioning */
  rightOffsets: number[];
}
