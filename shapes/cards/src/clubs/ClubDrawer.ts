import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath } from "@tsparticles/path-utils";
import { paths } from "../paths.js";

export class ClubDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    const { context, radius } = data;

    drawPath(context, radius, paths.clubs);
  }
}
