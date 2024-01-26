import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

const sides = 4;

/**
 */
export class SquareDrawer implements IShapeDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { drawSquare } = await import("./Utils.js");

        drawSquare(data);
    }

    getSidesCount(): number {
        return sides;
    }
}
