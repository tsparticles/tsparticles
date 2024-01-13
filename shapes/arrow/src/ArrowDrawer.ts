import type { Container, ICoordinates, IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import type { IArrowData } from "./IArrowData.js";

const double = 2,
    defaultHeightFactor = 0.5,
    defaultHeadWidthFactor = 0.2,
    defaultBodyHeightFactor = 0.5,
    half = 0.5,
    origin: ICoordinates = {
        x: 0,
        y: 0,
    };

export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
    draw(data: IShapeDrawData<ArrowParticle>): void {
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

    async particleInit(container: Container, particle: ArrowParticle): Promise<void> {
        const shapeData = particle.shapeData as IArrowData | undefined,
            { getRangeValue } = await import("@tsparticles/engine");

        particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? defaultHeightFactor);
        particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? defaultHeadWidthFactor);
        particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? defaultBodyHeightFactor);
    }
}
