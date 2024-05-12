import type { GrabContainer, LinkParticle } from "./Types.js";
import { type ICoordinates, type IRgb, drawLine, getStyleFromRgb } from "@tsparticles/engine";

const defaultWidth = 0;

/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 */
export function drawGrabLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    colorLine: IRgb,
    opacity: number,
): void {
    drawLine(context, begin, end);

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
}

/**
 * @param container -
 * @param particle -
 * @param lineColor -
 * @param opacity -
 * @param mousePos -
 */
export function drawGrab(
    container: GrabContainer,
    particle: LinkParticle,
    lineColor: IRgb,
    opacity: number,
    mousePos: ICoordinates,
): void {
    container.canvas.draw(ctx => {
        const beginPos = particle.getPosition();

        drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity);
    });
}
