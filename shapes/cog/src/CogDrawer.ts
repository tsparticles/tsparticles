import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { CogParticle } from "./CogParticle.js";
import type { ICogData } from "./ICogData.js";

export class CogDrawer implements IShapeDrawer<CogParticle> {
    afterDraw(data: IShapeDrawData<CogParticle>): void {
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

        const pi2 = 2 * Math.PI,
            holeRadius = (radius * particle.cogHoleRadius) / 100;

        context.globalCompositeOperation = "destination-out";

        context.beginPath();
        context.moveTo(holeRadius, 0);
        context.arc(0, 0, holeRadius, 0, pi2);
        context.closePath();
        context.fill();

        context.globalCompositeOperation = "source-over";
    }

    draw(data: IShapeDrawData<CogParticle>): void {
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

        const pi2 = 2 * Math.PI,
            angle = pi2 / (particle.cogNotches * 2),
            taperAI = angle * particle.cogInnerTaper * 0.005,
            taperAO = angle * particle.cogOuterTaper * 0.005,
            innerRadius = (radius * particle.cogInnerRadius) / 100;

        let a = angle, // iterator (angle)
            toggle = false; // notch radius level (i/o)

        // move to starting point
        context.moveTo(radius * Math.cos(taperAO), radius * Math.sin(taperAO));

        // loop
        for (; a <= pi2; a += angle) {
            // draw inner to outer line
            if (toggle) {
                context.lineTo(innerRadius * Math.cos(a - taperAI), innerRadius * Math.sin(a - taperAI));
                context.lineTo(radius * Math.cos(a + taperAO), radius * Math.sin(a + taperAO));
            }

            // draw outer to inner line
            else {
                context.lineTo(
                    radius * Math.cos(a - taperAO), // outer line
                    radius * Math.sin(a - taperAO),
                );
                context.lineTo(
                    innerRadius * Math.cos(a + taperAI), // inner line
                    innerRadius * Math.sin(a + taperAI),
                );
            }

            // switch level
            toggle = !toggle;
        }
    }

    particleInit(container: Container, particle: CogParticle): void {
        const shapeData = particle.shapeData as ICogData;

        particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? 44);
        particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? 72);
        particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? 35);
        particle.cogNotches = getRangeValue(shapeData?.notches ?? 7);
        particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? 50);
    }
}
