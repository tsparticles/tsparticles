import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ISpiralData } from "./ISpiralData.js";
import type { SpiralParticle } from "./SpiralParticle.js";
import { drawSpiral } from "./Utils.js";

const defaultInnerRadius = 1,
    defaultLineSpacing = 1,
    defaultWidthFactor = 10;

export class SpiralDrawer implements IShapeDrawer<SpiralParticle> {
    readonly validTypes = ["spiral"] as const;

    draw(data: IShapeDrawData<SpiralParticle>): void {
        drawSpiral(data);
    }

    particleInit(container: Container, particle: SpiralParticle): void {
        const pixelRatio = container.retina.pixelRatio,
            shapeData = particle.shapeData as ISpiralData | undefined;

        particle.spiralInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius) * pixelRatio;
        particle.spiralLineSpacing = getRangeValue(shapeData?.lineSpacing ?? defaultLineSpacing) * pixelRatio;
        particle.spiralWidthFactor = getRangeValue(shapeData?.widthFactor ?? defaultWidthFactor);
    }
}
