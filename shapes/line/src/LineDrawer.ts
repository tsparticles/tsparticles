import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

interface ILineData {
    cap?: CanvasLineCap;
}

/**
 */
export class LineDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, particle, radius } = data,
            shapeData = particle.shapeData as ILineData | undefined;

        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);

        context.lineCap = shapeData?.cap ?? "butt";
    }

    getSidesCount(): number {
        return 1;
    }
}
