import { type IHsl, type Particle, degToRad, getHdrStyleFromHsl, getStyleFromHsl } from "@tsparticles/engine";

const minWidth = 0,
    half = 0.5,
    double = 2;

/**
 * Draws an ellipse for the given particle.
 * @param context - The canvas context.
 * @param particle - The particle to draw.
 * @param fillColorValue - The particle fill color.
 * @param radius - The radius of the particle.
 * @param opacity - The opacity of the particle.
 * @param width - The width of the particle.
 * @param rotation - The rotation of the particle.
 * @param start - The start angle of the particle.
 * @param end - The end angle of the particle.
 */
export function drawEllipse(
    context: CanvasRenderingContext2D,
    particle: Particle,
    fillColorValue: IHsl | undefined,
    radius: number,
    opacity: number,
    width: number,
    rotation: number,
    start: number,
    end: number,
): void {
    if (width <= minWidth) {
        return;
    }

    const pos = particle.getPosition(),
        { container } = particle;

    if (fillColorValue) {
        context.strokeStyle = container.hdr
            ? getHdrStyleFromHsl(fillColorValue, opacity)
            : getStyleFromHsl(fillColorValue, opacity);
    }

    context.lineWidth = width;

    const rotationRadian = degToRad(rotation);

    context.beginPath();
    context.ellipse(pos.x, pos.y, radius * half, radius * double, rotationRadian, start, end);
    context.stroke();
}
