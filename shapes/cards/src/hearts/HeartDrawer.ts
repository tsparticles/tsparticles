import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath } from "../Utils.js";
import { paths } from "../paths.js";

export class HeartDrawer implements IShapeDrawer {
  readonly validTypes = ["heart", "hearts"] as const;

  draw(data: IShapeDrawData): void {
    drawPath(data, paths.heart);
  }
}
