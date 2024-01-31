import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

export class HeartDrawer implements IShapeDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { drawHeart } = await import("./Utils.js");

        drawHeart(data);
    }
}
