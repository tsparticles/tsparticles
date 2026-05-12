import type { Container } from "../Core/Container.js";

/** Custom event arguments with optional container reference and data */
export interface CustomEventArgs {
  /** The container that emitted the event */
  container?: Container;
  /** Additional event data */
  data?: unknown;
}
