import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

interface ILineData {
    cap?: CanvasLineCap;
}

const sides = 1;

/**
 */
export class LineDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, particle, radius } = data,
            shapeData = particle.shapeData as ILineData | undefined,
            centerY = 0;

        context.moveTo(-radius, centerY);
        context.lineTo(radius, centerY);

        context.lineCap = shapeData?.cap ?? "butt";
    }

    getSidesCount(): number {
        return sides;
    }
}
