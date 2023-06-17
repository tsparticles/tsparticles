import type { IParticle, IShapeDrawer } from "tsparticles-engine";

interface ILineData {
    cap?: CanvasLineCap;
}

/**
 */
export class LineDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const shapeData = particle.shapeData as ILineData;

        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);

        context.lineCap = shapeData.cap ?? "butt";
    }

    getSidesCount(): number {
        return 1;
    }
}
