import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class DiamondDrawer implements IShapeDrawer {
    readonly validTypes = ["diamond", "diamonds"] as const;

    draw(data: IShapeDrawData): void {
        drawPath(data, paths.diamond);
    }
}
