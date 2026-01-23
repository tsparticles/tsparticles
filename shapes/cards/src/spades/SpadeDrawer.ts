import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath } from "../Utils.js";
import { paths } from "../paths.js";

export class SpadeDrawer implements IShapeDrawer {
  readonly validTypes = ["spade", "spades"] as const;

  draw(data: IShapeDrawData): void {
    drawPath(data, paths.spade);
  }
}
