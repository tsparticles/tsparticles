import type { IShapeDrawData } from "@tsparticles/engine";
import type { SpiralParticle } from "./SpiralParticle.js";

/**
 *
 * @param data -
 */
export function drawSpiral(data: IShapeDrawData<SpiralParticle>): void {
    const { context, particle, radius } = data;

    if (
        particle.spiralInnerRadius === undefined ||
        particle.spiralLineSpacing === undefined ||
        particle.spiralWidthFactor === undefined
    ) {
        return;
    }

    const realWidth = (radius - particle.spiralInnerRadius) / particle.spiralLineSpacing,
        widthFactor = 10;

    for (let i = 0; i < realWidth * widthFactor; i++) {
        const angle = i / widthFactor,
            factor = particle.spiralInnerRadius + particle.spiralLineSpacing * angle,
            pos = {
                x: factor * Math.cos(angle),
                y: factor * Math.sin(angle),
            };

        context.lineTo(pos.x, pos.y);
    }
}
