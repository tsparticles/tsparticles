import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { CogParticle } from "./CogParticle.js";
import type { ICogData } from "./ICogData.js";

const defaultHoleRadius = 44,
    defaultInnerRadius = 72,
    defaultInnerTaper = 35,
    defaultNotches = 7,
    defaultOuterTaper = 50;

export class CogDrawer implements IShapeDrawer<CogParticle> {
    async afterDraw(data: IShapeDrawData<CogParticle>): Promise<void> {
        const { drawCogHole } = await import("./Utils.js");

        drawCogHole(data);
    }

    async draw(data: IShapeDrawData<CogParticle>): Promise<void> {
        const { drawCog } = await import("./Utils.js");

        drawCog(data);
    }

    async particleInit(container: Container, particle: CogParticle): Promise<void> {
        const shapeData = particle.shapeData as ICogData | undefined;

        particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? defaultHoleRadius);
        particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius);
        particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? defaultInnerTaper);
        particle.cogNotches = getRangeValue(shapeData?.notches ?? defaultNotches);
        particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? defaultOuterTaper);

        await Promise.resolve();
    }
}
