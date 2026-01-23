import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath } from "../Utils.js";
import { paths } from "../paths.js";

export class ClubDrawer implements IShapeDrawer {
  readonly validTypes = ["club", "clubs"] as const;

  draw(data: IShapeDrawData): void {
    drawPath(data, paths.club);
  }
}
