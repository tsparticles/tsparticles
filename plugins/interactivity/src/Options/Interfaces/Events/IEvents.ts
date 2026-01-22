import type { IClickEvent } from "./IClickEvent.js";
import type { IDivEvent } from "./IDivEvent.js";
import type { IHoverEvent } from "./IHoverEvent.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/**
 * [[include:Options/Interactivity/Events.md]]
 */
export interface IEvents {
  /**
   * Click event options
   */
  onClick: IClickEvent;

  /**
   * Div event options
   */
  onDiv: SingleOrMultiple<IDivEvent>;

  /**
   * Hover event options
   */
  onHover: IHoverEvent;
}
