import type { Main } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";

interface ISpiralData extends IShapeValues {
    innerRadius: number;
    lineSpacing: number;
}

export function loadSpiralShape(tsParticles: Main): void {
    tsParticles.addShape("spiral", (context, particle, radius, opacity, delta, pixelRatio) => {
        const shapeData = particle.shapeData as ISpiralData;

        if (shapeData?.innerRadius === undefined || shapeData.lineSpacing === undefined) {
            return;
        }

        const innerRadius = shapeData.innerRadius * pixelRatio;
        const lineSpacing = shapeData.lineSpacing * pixelRatio;

        const realWidth = (radius - innerRadius) / lineSpacing;

        for (let i = 0; i < realWidth * 10; i++) {
            const angle = 0.1 * i,
                positionFactor = innerRadius + lineSpacing * angle,
                x = positionFactor * Math.cos(angle),
                y = positionFactor * Math.sin(angle);

            context.lineTo(x, y);
        }
    });
}
