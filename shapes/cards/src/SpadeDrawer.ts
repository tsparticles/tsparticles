import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class SpadeDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.spade);
    }
}
