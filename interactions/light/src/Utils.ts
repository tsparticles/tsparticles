import { type ICoordinates, getStyleFromRgb } from "tsparticles-engine";
import type { LightContainer, LightParticle } from "./Types";

/**
 * @param container -
 * @param context -
 * @param mousePos -
 */
export function drawLight(container: LightContainer, context: CanvasRenderingContext2D, mousePos: ICoordinates): void {
    const lightOptions = container.actualOptions.interactivity.modes.light?.area;

    if (!lightOptions) {
        return;
    }

    context.beginPath();
    context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);

    const gradientAmbientLight = context.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        mousePos.x,
        mousePos.y,
        lightOptions.radius,
    );

    const gradientRgb = container.canvas.mouseLight;

    if (!gradientRgb || !gradientRgb.start || !gradientRgb.stop) {
        return;
    }

    gradientAmbientLight.addColorStop(0, getStyleFromRgb(gradientRgb.start));
    gradientAmbientLight.addColorStop(1, getStyleFromRgb(gradientRgb.stop));

    context.fillStyle = gradientAmbientLight;
    context.fill();
}

/**
 * @param container -
 * @param context -
 * @param particle -
 * @param mousePos -
 */
export function drawParticleShadow(
    container: LightContainer,
    context: CanvasRenderingContext2D,
    particle: LightParticle,
    mousePos: ICoordinates,
): void {
    const pos = particle.getPosition(),
        shadowOptions = container.actualOptions.interactivity.modes.light?.shadow;

    if (!shadowOptions) {
        return;
    }

    const shadowRgb = particle.lightShadow;

    if (!shadowRgb) {
        return;
    }

    const radius = particle.getRadius(),
        sides = particle.sides,
        full = (Math.PI * 2) / sides,
        angle = -particle.rotation + Math.PI / 4,
        factor = 1, //Math.sqrt(2)
        dots: ICoordinates[] = [];

    for (let i = 0; i < sides; i++) {
        dots.push({
            x: pos.x + radius * Math.sin(angle + full * i) * factor,
            y: pos.y + radius * Math.cos(angle + full * i) * factor,
        });
    }

    const points = [],
        shadowLength = shadowOptions.length;

    for (const dot of dots) {
        const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x),
            end: ICoordinates = {
                x: dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2),
                y: dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2),
            };

        points.push({
            end: end,
            start: dot,
        });
    }

    const shadowColor = getStyleFromRgb(shadowRgb),
        last = points.length - 1;

    for (let i = last, n = 0; i >= 0; n = --i) {
        context.beginPath();

        context.moveTo(points[i].start.x, points[i].start.y);

        context.lineTo(points[n].start.x, points[n].start.y);
        context.lineTo(points[n].end.x, points[n].end.y);
        context.lineTo(points[i].end.x, points[i].end.y);

        context.fillStyle = shadowColor;

        context.fill();
    }
}
