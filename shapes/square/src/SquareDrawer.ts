import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawSquare } from "./Utils.js";

const sides = 4;

/**
 */
export class SquareDrawer implements IShapeDrawer {
    readonly validTypes = ["edge", "square"] as const;

    draw(data: IShapeDrawData): void {
        drawSquare(data);
    }

    getSidesCount(): number {
        return sides;
    }
}
