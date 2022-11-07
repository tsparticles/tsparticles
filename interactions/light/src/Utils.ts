import type { LightContainer, LightParticle } from "./Types";
import type { ICoordinates } from "tsparticles-engine";
import { getStyleFromRgb } from "tsparticles-engine";

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
        lightOptions.radius
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

export function drawParticleShadow(
    container: LightContainer,
    context: CanvasRenderingContext2D,
    particle: LightParticle,
    mousePos: ICoordinates
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
        dots = [];

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
            endX = dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2),
            endY = dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2);

        points.push({
            endX: endX,
            endY: endY,
            startX: dot.x,
            startY: dot.y,
        });
    }

    const shadowColor = getStyleFromRgb(shadowRgb);

    for (let i = points.length - 1; i >= 0; i--) {
        const n = i === points.length - 1 ? 0 : i + 1;

        context.beginPath();

        context.moveTo(points[i].startX, points[i].startY);

        context.lineTo(points[n].startX, points[n].startY);
        context.lineTo(points[n].endX, points[n].endY);
        context.lineTo(points[i].endX, points[i].endY);

        context.fillStyle = shadowColor;

        context.fill();
    }
}
