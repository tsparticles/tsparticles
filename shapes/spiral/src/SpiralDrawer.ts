import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ISpiralData } from "./ISpiralData.js";
import type { SpiralParticle } from "./SpiralParticle.js";

export class SpiralDrawer implements IShapeDrawer<SpiralParticle> {
    draw(data: IShapeDrawData<SpiralParticle>): void {
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

    particleInit(container: Container, particle: SpiralParticle): void {
        const pixelRatio = container.retina.pixelRatio,
            shapeData = particle.shapeData as ISpiralData;

        particle.spiralInnerRadius = getRangeValue(shapeData.innerRadius ?? 1) * pixelRatio;
        particle.spiralLineSpacing = getRangeValue(shapeData.lineSpacing ?? 1) * pixelRatio;
        particle.spiralWidthFactor = getRangeValue(shapeData.widthFactor ?? 10);
    }
}
