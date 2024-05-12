import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { drawCog, drawCogHole } from "./Utils.js";
import type { CogParticle } from "./CogParticle.js";
import type { ICogData } from "./ICogData.js";

const defaultHoleRadius = 44,
    defaultInnerRadius = 72,
    defaultInnerTaper = 35,
    defaultNotches = 7,
    defaultOuterTaper = 50;

export class CogDrawer implements IShapeDrawer<CogParticle> {
    readonly validTypes = ["cog"] as const;

    afterDraw(data: IShapeDrawData<CogParticle>): void {
        drawCogHole(data);
    }

    draw(data: IShapeDrawData<CogParticle>): void {
        drawCog(data);
    }

    particleInit(container: Container, particle: CogParticle): void {
        const shapeData = particle.shapeData as ICogData | undefined;

        particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? defaultHoleRadius);
        particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius);
        particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? defaultInnerTaper);
        particle.cogNotches = getRangeValue(shapeData?.notches ?? defaultNotches);
        particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? defaultOuterTaper);
    }
}
