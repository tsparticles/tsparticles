import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class SpadeDrawer implements IShapeDrawer {
    readonly validTypes = ["spade", "spades"] as const;

    draw(data: IShapeDrawData): void {
        drawPath(data, paths.spade);
    }
}
