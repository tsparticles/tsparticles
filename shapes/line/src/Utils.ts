import type { IShapeDrawData } from "@tsparticles/engine";

interface ILineData {
    cap?: CanvasLineCap;
}

/**
 *
 * @param data -
 */
export function drawLine(data: IShapeDrawData): void {
    const { context, particle, radius } = data,
        shapeData = particle.shapeData as ILineData | undefined,
        centerY = 0;

    context.moveTo(-radius, centerY);
    context.lineTo(radius, centerY);

    context.lineCap = shapeData?.cap ?? "butt";
}
