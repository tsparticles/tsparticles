import type { IParticle } from "tsparticles";
import type { IShapeValues } from "tsparticles/dist/Options/Interfaces/Particles/Shape/IShapeValues";
import type { IShapeDrawer } from "tsparticles/dist/Core/Interfaces/IShapeDrawer";
import type { Container } from "tsparticles";

type RectInfo = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type RadiusInfo = {
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
    topLeft: number;
};

interface IRoundedRectData extends IShapeValues {
    radius: number;
}

interface IRoundedParticle extends IParticle {
    borderRadius: number;
}

const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    info: RectInfo,
    radius: RadiusInfo = {
        topRight: 4,
        bottomRight: 4,
        bottomLeft: 4,
        topLeft: 4,
    }
) => {
    const { x, y, width, height } = info;
    const r = x + width;
    const b = y + height;

    ctx.moveTo(x + radius.topLeft, y);
    ctx.lineTo(r - radius.topRight, y);
    ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
    ctx.lineTo(r, y + height - radius.bottomRight);
    ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
    ctx.lineTo(x + radius.bottomLeft, b);
    ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
    ctx.lineTo(x, y + radius.topLeft);
    ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
};

export class RoundedRectDrawer implements IShapeDrawer {
    particleInit(container: Container, particle: IParticle): void {
        const shapeData = particle.shapeData as IRoundedRectData;
        const roundedRect = particle as IRoundedParticle;

        roundedRect.borderRadius = (shapeData?.radius ?? 4) * container.retina.pixelRatio;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
        const roundedRect = particle as IRoundedParticle;

        drawRoundedRect(
            context,
            {
                x: 0,
                y: 0,
                height: radius,
                width: radius,
            },
            {
                topLeft: roundedRect.borderRadius,
                topRight: roundedRect.borderRadius,
                bottomLeft: roundedRect.borderRadius,
                bottomRight: roundedRect.borderRadius,
            }
        );
    }
}
