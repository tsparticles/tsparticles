import type { DivType } from "../../../DivType.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/**
 * [[include:Options/Interactivity/Div.md]]
 */
export interface IDivEvent {
  /**
   * This property is used to enable or disable the event.
   */
  enable: boolean;

  /**
   * This property is used to define how the particles are interacting with the divs.
   */
  mode: SingleOrMultiple<string>;

  /**
   * This property is used to define the divs query selectors.
   */
  selectors: SingleOrMultiple<string>;

  /**
   * This property is used to define the divs shape types.
   */
  type: DivType | keyof typeof DivType;
}
