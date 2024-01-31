import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ISpiralData } from "./ISpiralData.js";
import type { SpiralParticle } from "./SpiralParticle.js";

const defaultInnerRadius = 1,
    defaultLineSpacing = 1,
    defaultWidthFactor = 10;

export class SpiralDrawer implements IShapeDrawer<SpiralParticle> {
    async draw(data: IShapeDrawData<SpiralParticle>): Promise<void> {
        const { drawSpiral } = await import("./Utils.js");

        drawSpiral(data);
    }

    async particleInit(container: Container, particle: SpiralParticle): Promise<void> {
        const pixelRatio = container.retina.pixelRatio,
            shapeData = particle.shapeData as ISpiralData | undefined;

        particle.spiralInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius) * pixelRatio;
        particle.spiralLineSpacing = getRangeValue(shapeData?.lineSpacing ?? defaultLineSpacing) * pixelRatio;
        particle.spiralWidthFactor = getRangeValue(shapeData?.widthFactor ?? defaultWidthFactor);

        await Promise.resolve();
    }
}
