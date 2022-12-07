import type { IParticle, IShapeDrawer } from "tsparticles-engine";
import { drawPath, paths } from "./Utils";

export class SpadeDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        drawPath(context, radius, paths.spade);
    }
}

export class HeartDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        drawPath(context, radius, paths.heart);
    }
}

export class DiamondDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        drawPath(context, radius, paths.diamond);
    }
}

export class ClubDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        drawPath(context, radius, paths.club);
    }
}
