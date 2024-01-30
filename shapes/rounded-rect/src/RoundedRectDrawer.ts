import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { IRoundedRectData } from "./IRoundedRectData.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const fixFactorSquare = 2,
    fixFactor = Math.sqrt(fixFactorSquare),
    double = 2,
    defaultRadius = 5;

export class RoundedRectDrawer implements IShapeDrawer<RoundedParticle> {
    async draw(data: IShapeDrawData<RoundedParticle>): Promise<void> {
        const { context, particle, radius } = data,
            fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * double,
            borderRadius = particle.borderRadius ?? defaultRadius;

        if ("roundRect" in context) {
            context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
        } else {
            const { drawRoundedRect } = await import("./Utils.js");

            drawRoundedRect(context, fixedRadius, fixedDiameter, borderRadius);
        }
    }

    async particleInit(container: Container, particle: RoundedParticle): Promise<void> {
        const shapeData = particle.shapeData as IRoundedRectData | undefined;

        particle.borderRadius = getRangeValue(shapeData?.radius ?? defaultRadius) * container.retina.pixelRatio;

        await Promise.resolve();
    }
}
