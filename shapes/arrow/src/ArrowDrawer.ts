import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import type { IArrowData } from "./IArrowData.js";

export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
    draw(data: IShapeDrawData<ArrowParticle>): void {
        const { context, particle, radius } = data,
            width = radius * 2,
            heightFactor = particle.heightFactor ?? 0.5,
            headWidthFactor = particle.headWidthFactor ?? 0.2,
            bodyHeightFactor = particle.bodyHeightFactor ?? 0.5,
            height = width * heightFactor,
            headWidth = width * headWidthFactor,
            bodyHeight = height * bodyHeightFactor;

        context.moveTo(-width / 2, 0);
        context.lineTo(-width / 2, -bodyHeight / 2);
        context.lineTo(width / 2 - headWidth, -bodyHeight / 2);
        context.lineTo(width / 2 - headWidth, -height / 2);
        context.lineTo(width / 2 + headWidth, 0);
        context.lineTo(width / 2 - headWidth, height / 2);
        context.lineTo(width / 2 - headWidth, bodyHeight / 2);
        context.lineTo(-width / 2, bodyHeight / 2);
        context.lineTo(-width / 2, 0);
    }

    particleInit(container: Container, particle: ArrowParticle): void {
        const shapeData = particle.shapeData as IArrowData | undefined;

        particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? 0.5);
        particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? 0.2);
        particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? 0.5);
    }
}
