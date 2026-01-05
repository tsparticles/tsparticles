import { type ICoordinates, getHdrStyleFromRgb, getStyleFromRgb } from "@tsparticles/engine";
import type { LightContainer, LightParticle } from "./Types.js";

const gradientPos = {
        max: 1,
        min: 0,
    },
    half = 0.5,
    double = 2,
    halfPI = Math.PI * half,
    doublePI = Math.PI * double,
    quarter = 0.25,
    quarterPI = Math.PI * quarter,
    arcStart = 0;

export const lightMode = "light";

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
    context.arc(mousePos.x, mousePos.y, lightOptions.radius, arcStart, doublePI);

    const gradientAmbientLight = context.createRadialGradient(
        mousePos.x,
        mousePos.y,
        arcStart,
        mousePos.x,
        mousePos.y,
        lightOptions.radius,
    );

    const gradientRgb = container.canvas.mouseLight;

    if (!gradientRgb?.start || !gradientRgb.stop) {
        return;
    }

    if (container.hdr) {
        gradientAmbientLight.addColorStop(gradientPos.min, getHdrStyleFromRgb(gradientRgb.start));
        gradientAmbientLight.addColorStop(gradientPos.max, getHdrStyleFromRgb(gradientRgb.stop));
    } else {
        gradientAmbientLight.addColorStop(gradientPos.min, getStyleFromRgb(gradientRgb.start));
        gradientAmbientLight.addColorStop(gradientPos.max, getStyleFromRgb(gradientRgb.stop));
    }

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
        full = doublePI / sides,
        angle = -particle.rotation + quarterPI,
        factor = 1, // Math.sqrt(2)
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
                x: dot.x + shadowLength * Math.sin(-dotAngle - halfPI),
                y: dot.y + shadowLength * Math.cos(-dotAngle - halfPI),
            };

        points.push({
            end: end,
            start: dot,
        });
    }

    const shadowColor = container.hdr ? getHdrStyleFromRgb(shadowRgb) : getStyleFromRgb(shadowRgb),
        lastOffset = 1,
        firstPos = 0,
        last = points.length - lastOffset;

    for (let i = last, n = 0; i >= firstPos; n = i--) {
        context.beginPath();

        const iPoint = points[i],
            nPoint = points[n];

        if (!iPoint || !nPoint) {
            continue;
        }

        context.moveTo(iPoint.start.x, iPoint.start.y);

        context.lineTo(nPoint.start.x, nPoint.start.y);
        context.lineTo(nPoint.end.x, nPoint.end.y);
        context.lineTo(iPoint.end.x, iPoint.end.y);

        context.fillStyle = shadowColor;

        context.fill();
    }
}
