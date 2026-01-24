import type { Container } from "../Core/Container.js";

export interface CustomEventArgs {
  container?: Container;
  data?: unknown;
}
