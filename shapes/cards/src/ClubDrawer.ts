import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class ClubDrawer implements IShapeDrawer {
    readonly validTypes = ["club", "clubs"] as const;

    draw(data: IShapeDrawData): void {
        drawPath(data, paths.club);
    }
}
