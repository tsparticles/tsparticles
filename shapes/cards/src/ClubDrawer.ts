import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

export class ClubDrawer implements IShapeDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { drawPath, paths } = await import("./Utils.js");

        drawPath(data, paths.club);
    }
}