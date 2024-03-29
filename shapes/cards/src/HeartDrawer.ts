import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class HeartDrawer implements IShapeDrawer {
    readonly validTypes = ["heart", "hearts"] as const;

    draw(data: IShapeDrawData): void {
        drawPath(data, paths.heart);
    }
}
