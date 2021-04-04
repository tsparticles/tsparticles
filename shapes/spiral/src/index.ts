import type { IDelta, IParticle, Main } from "tsparticles-engine";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";

interface ISpiralData extends IShapeValues {
    innerRadius: number;
    lineSpacing: number;
}

export function loadSpiralShape(tsParticles: Main) {
    tsParticles.addShape(
        "spiral",
        function (
            context: CanvasRenderingContext2D,
            particle: IParticle,
            radius: number,
            opacity: number,
            delta: IDelta,
            pixelRatio: number
        ) {
            const shapeData = particle.shapeData as ISpiralData,
                innerRadius = (shapeData.innerRadius ?? 1) * pixelRatio,
                lineSpacing = (shapeData.lineSpacing ?? 1) * pixelRatio,
                realWidth = (radius - innerRadius) / lineSpacing;

            for (let i = 0; i < realWidth * 10; i++) {
                const angle = 0.1 * i,
                    positionFactor = innerRadius + lineSpacing * angle,
                    x = positionFactor * Math.cos(angle),
                    y = positionFactor * Math.sin(angle);

                context.lineTo(x, y);
            }
        }
    );
}
