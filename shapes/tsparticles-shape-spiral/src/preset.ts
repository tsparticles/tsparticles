import { tsParticles } from "tsparticles";
import { IParticle } from "tsparticles/dist/Core/Interfaces/IParticle";
import { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";

interface ISpiralData extends IShapeValues {
    innerRadius: number;
    lineSpacing: number;
}

tsParticles.addShape('spiral', function (context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
    const shapeData = particle.shapeData as ISpiralData;

    if (shapeData?.innerRadius === undefined || shapeData.lineSpacing === undefined) {
        return;
    }

    const realWidth = (radius - shapeData.innerRadius) / shapeData.lineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
        const angle = 0.1 * i, positionFactor = shapeData.innerRadius + shapeData.lineSpacing * angle,
            x = positionFactor * Math.cos(angle), y = positionFactor * Math.sin(angle);

        context.lineTo(x, y);
    }
});