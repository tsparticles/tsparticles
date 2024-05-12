import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import type { IArrowData } from "./IArrowData.js";
import { drawArrow } from "./Utils.js";

const defaultHeightFactor = 0.5,
    defaultHeadWidthFactor = 0.2,
    defaultBodyHeightFactor = 0.5;

export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
    readonly validTypes = ["arrow"] as const;

    draw(data: IShapeDrawData<ArrowParticle>): void {
        drawArrow(data);
    }

    particleInit(container: Container, particle: ArrowParticle): void {
        const shapeData = particle.shapeData as IArrowData | undefined;

        particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? defaultHeightFactor);
        particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? defaultHeadWidthFactor);
        particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? defaultBodyHeightFactor);
    }
}
