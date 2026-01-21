import { type IShapeDrawData, double, doublePI, originPoint, percentDenominator } from "@tsparticles/engine";
import type { CogParticle } from "./CogParticle.js";

const minAngle = 0,
    taperFactor = 0.005;

/**
 *
 * @param data -
 */
export function drawCogHole(data: IShapeDrawData<CogParticle>): void {
    const { context, particle, radius } = data;

    if (
        particle.cogHoleRadius === undefined ||
        particle.cogInnerRadius === undefined ||
        particle.cogInnerTaper === undefined ||
        particle.cogNotches === undefined ||
        particle.cogOuterTaper === undefined
    ) {
        return;
    }

    const holeRadius = (radius * particle.cogHoleRadius) / percentDenominator;

    context.globalCompositeOperation = "destination-out";

    context.beginPath();
    context.moveTo(holeRadius, originPoint.y);
    context.arc(originPoint.x, originPoint.y, holeRadius, minAngle, doublePI);
    context.closePath();
    context.fill();

    context.globalCompositeOperation = "source-over";
}

/**
 *
 * @param data -
 */
export function drawCog(data: IShapeDrawData<CogParticle>): void {
    const { context, particle, radius } = data;

    if (
        particle.cogHoleRadius === undefined ||
        particle.cogInnerRadius === undefined ||
        particle.cogInnerTaper === undefined ||
        particle.cogNotches === undefined ||
        particle.cogOuterTaper === undefined
    ) {
        return;
    }

    const angle = doublePI / (particle.cogNotches * double),
        taperAI = angle * particle.cogInnerTaper * taperFactor,
        taperAO = angle * particle.cogOuterTaper * taperFactor,
        innerRadius = (radius * particle.cogInnerRadius) / percentDenominator;

    let a = angle,
        toggle = false;

    context.moveTo(radius * Math.cos(taperAO), radius * Math.sin(taperAO));

    for (; a <= doublePI; a += angle) {
        if (toggle) {
            context.lineTo(innerRadius * Math.cos(a - taperAI), innerRadius * Math.sin(a - taperAI));
            context.lineTo(radius * Math.cos(a + taperAO), radius * Math.sin(a + taperAO));
        } else {
            context.lineTo(radius * Math.cos(a - taperAO), radius * Math.sin(a - taperAO));
            context.lineTo(innerRadius * Math.cos(a + taperAI), innerRadius * Math.sin(a + taperAI));
        }

        toggle = !toggle;
    }
}
