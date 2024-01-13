import {
    type Container,
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    percentDenominator,
} from "@tsparticles/engine";
import type { CogParticle } from "./CogParticle.js";
import type { ICogData } from "./ICogData.js";

const double = 2,
    doublePI = Math.PI * double,
    minAngle = 0,
    origin: ICoordinates = { x: 0, y: 0 },
    taperFactor = 0.005,
    defaultHoleRadius = 44,
    defaultInnerRadius = 72,
    defaultInnerTaper = 35,
    defaultNotches = 7,
    defaultOuterTaper = 50;

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

        const holeRadius = (radius * particle.cogHoleRadius) / percentDenominator;

        context.globalCompositeOperation = "destination-out";

        context.beginPath();
        context.moveTo(holeRadius, origin.y);
        context.arc(origin.x, origin.y, holeRadius, minAngle, doublePI);
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

        const angle = doublePI / (particle.cogNotches * double),
            taperAI = angle * particle.cogInnerTaper * taperFactor,
            taperAO = angle * particle.cogOuterTaper * taperFactor,
            innerRadius = (radius * particle.cogInnerRadius) / percentDenominator;

        let a = angle, // iterator (angle)
            toggle = false; // notch radius level (i/o)

        // move to starting point
        context.moveTo(radius * Math.cos(taperAO), radius * Math.sin(taperAO));

        // loop
        for (; a <= doublePI; a += angle) {
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

    async particleInit(container: Container, particle: CogParticle): Promise<void> {
        const shapeData = particle.shapeData as ICogData | undefined,
            { getRangeValue } = await import("@tsparticles/engine");

        particle.cogHoleRadius = getRangeValue(shapeData?.holeRadius ?? defaultHoleRadius);
        particle.cogInnerRadius = getRangeValue(shapeData?.innerRadius ?? defaultInnerRadius);
        particle.cogInnerTaper = getRangeValue(shapeData?.innerTaper ?? defaultInnerTaper);
        particle.cogNotches = getRangeValue(shapeData?.notches ?? defaultNotches);
        particle.cogOuterTaper = getRangeValue(shapeData?.outerTaper ?? defaultOuterTaper);
    }
}
