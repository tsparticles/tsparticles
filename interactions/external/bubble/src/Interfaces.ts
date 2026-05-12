import type { ProcessBubbleType } from "./Enums.js";

/** Interfaces for bubble process param objects */
export interface Interfaces {
  /** Bubble option value object */
  bubbleObj: IBubblerProcessParamObj;

  /** Particle option value object */
  particlesObj: IBubblerProcessParamObj;

  /** Processing type */
  type: ProcessBubbleType;
}

/** Bubble process param object */
export interface IBubblerProcessParamObj {
  /** Option value */
  optValue?: number;

  /** Current value */
  value?: number;
}
