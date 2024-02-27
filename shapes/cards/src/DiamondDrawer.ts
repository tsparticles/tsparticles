import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class DiamondDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.diamond);
    }
}
