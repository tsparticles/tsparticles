import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

const sides = 1;

/**
 */
export class LineDrawer implements IShapeDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { drawLine } = await import("./Utils.js");

        drawLine(data);
    }

    getSidesCount(): number {
        return sides;
    }
}
