import { type Container, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle";
import type { IArrowData } from "./IArrowData";

export class ArrowDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: ArrowParticle, radius: number): void {
        const width = radius * 2,
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
        const shapeData = particle.shapeData as IArrowData;

        particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? 0.5);
        particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? 0.2);
        particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? 0.5);
    }
}
