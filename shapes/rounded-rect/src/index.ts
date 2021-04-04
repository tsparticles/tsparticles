import type { Main, IParticle, IDelta } from "tsparticles-engine";
import type { IShapeValues } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IShapeValues";

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

    ctx.beginPath();
    ctx.moveTo(x + radius.topLeft, y);
    ctx.lineTo(r - radius.topRight, y);
    ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
    ctx.lineTo(r, y + height - radius.bottomRight);
    ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
    ctx.lineTo(x + radius.bottomLeft, b);
    ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
    ctx.lineTo(x, y + radius.topLeft);
    ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

export function loadRoundedRectShape(tsParticles: Main): void {
    tsParticles.addShape(
        "rounded-rect",
        function (
            context: CanvasRenderingContext2D,
            particle: IParticle,
            radius: number,
            opacity: number,
            delta: IDelta,
            pixelRatio: number
        ): void {
            const shapeData = particle.shapeData as IRoundedRectData;
            const borderRadius = (shapeData?.radius ?? 4) * pixelRatio;

            drawRoundedRect(
                context,
                {
                    x: 0,
                    y: 0,
                    height: radius,
                    width: radius,
                },
                {
                    topLeft: borderRadius,
                    topRight: borderRadius,
                    bottomLeft: borderRadius,
                    bottomRight: borderRadius,
                }
            );
        }
    );
}
