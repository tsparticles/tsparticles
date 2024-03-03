import type { ConnectContainer, LinkParticle } from "./Types.js";
import {
    type ICoordinates,
    type Particle,
    clamp,
    colorMix,
    drawLine,
    getStyleFromHsl,
    getStyleFromRgb,
} from "@tsparticles/engine";

const gradientMin = 0,
    gradientMax = 1,
    defaultLinksWidth = 0;

/**
 * Creates a gradient using two particles colors and opacity.
 * @param context - The canvas context to draw on.
 * @param p1 - The first particle.
 * @param p2 - The second particle.
 * @param opacity - The opacity of the gradient.
 * @returns The gradient.
 */
export function gradient(
    context: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle,
    opacity: number,
): CanvasGradient | undefined {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()),
        color1 = p1.getFillColor(),
        color2 = p2.getFillColor();

    if (!color1 || !color2) {
        return;
    }

    const sourcePos = p1.getPosition(),
        destPos = p2.getPosition(),
        midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()),
        grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

    grad.addColorStop(gradientMin, getStyleFromHsl(color1, opacity));
    grad.addColorStop(clamp(gradStop, gradientMin, gradientMax), getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(gradientMax, getStyleFromHsl(color2, opacity));

    return grad;
}

/**
 * @param context -
 * @param width -
 * @param lineStyle -
 * @param begin -
 * @param end -
 */
export function drawConnectLine(
    context: CanvasRenderingContext2D,
    width: number,
    lineStyle: CanvasGradient,
    begin: ICoordinates,
    end: ICoordinates,
): void {
    drawLine(context, begin, end);

    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
}

/**
 * @param container -
 * @param ctx -
 * @param p1 -
 * @param p2 -
 * @returns The gradient.
 */
export function lineStyle(
    container: ConnectContainer,
    ctx: CanvasRenderingContext2D,
    p1: Particle,
    p2: Particle,
): CanvasGradient | undefined {
    const options = container.actualOptions,
        connectOptions = options.interactivity.modes.connect;

    if (!connectOptions) {
        return;
    }

    return gradient(ctx, p1, p2, connectOptions.links.opacity);
}

/**
 * @param container -
 * @param p1 -
 * @param p2 -
 */
export function drawConnection(container: ConnectContainer, p1: LinkParticle, p2: LinkParticle): void {
    container.canvas.draw(ctx => {
        const ls = lineStyle(container, ctx, p1, p2);

        if (!ls) {
            return;
        }

        const pos1 = p1.getPosition(),
            pos2 = p2.getPosition();

        drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
    });
}
