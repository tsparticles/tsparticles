import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import type { IArrowData } from "./IArrowData.js";

const defaultHeightFactor = 0.5,
    defaultHeadWidthFactor = 0.2,
    defaultBodyHeightFactor = 0.5;

export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
    async draw(data: IShapeDrawData<ArrowParticle>): Promise<void> {
        const { drawArrow } = await import("./Utils.js");

        drawArrow(data);
    }

    async particleInit(container: Container, particle: ArrowParticle): Promise<void> {
        const shapeData = particle.shapeData as IArrowData | undefined;

        particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? defaultHeightFactor);
        particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? defaultHeadWidthFactor);
        particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? defaultBodyHeightFactor);

        await Promise.resolve();
    }
}
