import type { ICoordinates, IShapeDrawData } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";

const double = 2,
    defaultHeightFactor = 0.5,
    defaultHeadWidthFactor = 0.2,
    defaultBodyHeightFactor = 0.5,
    half = 0.5,
    origin: ICoordinates = {
        x: 0,
        y: 0,
    };

/**
 *
 * @param data
 */
export function drawArrow(data: IShapeDrawData<ArrowParticle>): void {
    const { context, particle, radius } = data,
        width = radius * double,
        heightFactor = particle.heightFactor ?? defaultHeightFactor,
        headWidthFactor = particle.headWidthFactor ?? defaultHeadWidthFactor,
        bodyHeightFactor = particle.bodyHeightFactor ?? defaultBodyHeightFactor,
        height = width * heightFactor,
        headWidth = width * headWidthFactor,
        bodyHeight = height * bodyHeightFactor;

    context.moveTo(-width * half, origin.y);
    context.lineTo(-width * half, -bodyHeight * half);
    context.lineTo(width * half - headWidth, -bodyHeight * half);
    context.lineTo(width * half - headWidth, -height * half);
    context.lineTo(width * half + headWidth, origin.y);
    context.lineTo(width * half - headWidth, height * half);
    context.lineTo(width * half - headWidth, bodyHeight * half);
    context.lineTo(-width * half, bodyHeight * half);
    context.lineTo(-width * half, origin.y);
}
