import { type IHsl, type Particle, getStyleFromHsl } from "tsparticles-engine";

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
    if (width <= 0) {
        return;
    }

    const pos = particle.getPosition();

    if (fillColorValue) {
        context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
    }

    context.lineWidth = width;

    const rotationRadian = (rotation * Math.PI) / 180;

    context.beginPath();
    context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
    context.stroke();
}
