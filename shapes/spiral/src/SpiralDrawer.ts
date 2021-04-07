import type { IParticle } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";
import { IShapeDrawer } from "tsparticles/dist/Core/Interfaces/IShapeDrawer";
import { Container } from "tsparticles";

interface ISpiralData extends IShapeValues {
    innerRadius: number;
    lineSpacing: number;
}

interface ISpiralParticle extends IParticle {
    spiralInnerRadius: number;
    spiralLineSpacing: number;
}

export class SpiralDrawer implements IShapeDrawer {
    particleInit(container: Container, particle: IParticle): void {
        const pixelRatio = container.retina.pixelRatio,
            shapeData = particle.shapeData as ISpiralData,
            spiral = particle as ISpiralParticle;

        spiral.spiralInnerRadius = (shapeData.innerRadius ?? 1) * pixelRatio;
        spiral.spiralLineSpacing = (shapeData.lineSpacing ?? 1) * pixelRatio;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
        const spiral = particle as ISpiralParticle,
            realWidth = (radius - spiral.spiralInnerRadius) / spiral.spiralLineSpacing;

        for (let i = 0; i < realWidth * 10; i++) {
            const angle = 0.1 * i,
                positionFactor = spiral.spiralInnerRadius + spiral.spiralLineSpacing * angle,
                x = positionFactor * Math.cos(angle),
                y = positionFactor * Math.sin(angle);

            context.lineTo(x, y);
        }
    }
}
