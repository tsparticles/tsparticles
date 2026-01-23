import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath } from "../Utils.js";
import { paths } from "../paths.js";

export class DiamondDrawer implements IShapeDrawer {
  readonly validTypes = ["diamond", "diamonds"] as const;

  draw(data: IShapeDrawData): void {
    drawPath(data, paths.diamond);
  }
}
