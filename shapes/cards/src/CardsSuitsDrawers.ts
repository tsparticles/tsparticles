import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawPath, paths } from "./Utils.js";

export class SpadeDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.spade);
    }
}

export class HeartDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.heart);
    }
}

export class DiamondDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.diamond);
    }
}

export class ClubDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        drawPath(data, paths.club);
    }
}
