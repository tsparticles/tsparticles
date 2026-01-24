import { type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import { drawInfinity } from "./Utils.js";

export class InfinityDrawer implements IShapeDrawer {
  readonly validTypes = ["infinity"] as const;

  draw(data: IShapeDrawData): void {
    drawInfinity(data);
  }
}
