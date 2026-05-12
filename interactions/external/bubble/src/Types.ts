import type { Bubble } from "./Options/Classes/Bubble.js";
import type { BubbleOptions } from "./Options/Classes/BubbleOptions.js";
import type { IBubble } from "./Options/Interfaces/IBubble.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

/** Bubble mode interface */
export interface IBubbleMode {
  /** Bubble options */
  bubble: IBubble;
}

/** Bubble mode options */
export interface BubbleMode {
  /** Bubble options, undefined if not set */
  bubble?: Bubble;
}

/** Container bubble data */
export interface IContainerBubble {
  /** Whether the user is clicking */
  clicking?: boolean;
  /** Whether the bubble duration has ended */
  durationEnd?: boolean;
}

/** Bubble container interface */
export type BubbleContainer = InteractivityContainer & {
  actualOptions: BubbleOptions;
  bubble?: IContainerBubble;
  retina: {
    /** Bubble mode distance in pixels */
    bubbleModeDistance?: number;
    /** Bubble mode size in pixels */
    bubbleModeSize?: number;
  };
};
