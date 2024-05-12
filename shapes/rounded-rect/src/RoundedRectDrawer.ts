import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { IRoundedRectData } from "./IRoundedRectData.js";
import type { RoundedParticle } from "./RoundedParticle.js";
import { drawRoundedRect } from "./Utils.js";

const fixFactorSquare = 2,
    fixFactor = Math.sqrt(fixFactorSquare),
    double = 2,
    defaultRadius = 5;

export class RoundedRectDrawer implements IShapeDrawer<RoundedParticle> {
    readonly validTypes = ["rounded-rect"] as const;

    draw(data: IShapeDrawData<RoundedParticle>): void {
        const { context, particle, radius } = data,
            fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * double,
            borderRadius = particle.borderRadius ?? defaultRadius;

        if ("roundRect" in context) {
            context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
        } else {
            drawRoundedRect(context, fixedRadius, fixedDiameter, borderRadius);
        }
    }

    particleInit(container: Container, particle: RoundedParticle): void {
        const shapeData = particle.shapeData as IRoundedRectData | undefined;

        particle.borderRadius = getRangeValue(shapeData?.radius ?? defaultRadius) * container.retina.pixelRatio;
    }
}
