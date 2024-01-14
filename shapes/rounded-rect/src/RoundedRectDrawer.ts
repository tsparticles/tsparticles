import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import type { IRoundedRectData } from "./IRoundedRectData.js";
import type { RadiusInfo } from "./RadiusInfo.js";
import type { RectInfo } from "./RectInfo.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const fixFactorSquare = 2,
    fixFactor = Math.sqrt(fixFactorSquare),
    double = 2,
    defaultRadius = 5,
    drawRoundedRect = (
        ctx: CanvasRenderingContext2D,
        info: RectInfo,
        radius: RadiusInfo = {
            topRight: 4,
            bottomRight: 4,
            bottomLeft: 4,
            topLeft: 4,
        },
    ): void => {
        const { x, y, width, height } = info,
            r = x + width,
            b = y + height;

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

export class RoundedRectDrawer implements IShapeDrawer<RoundedParticle> {
    draw(data: IShapeDrawData<RoundedParticle>): void {
        const { context, particle, radius } = data,
            fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * double,
            borderRadius = particle.borderRadius ?? defaultRadius;

        if ("roundRect" in context) {
            context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
        } else {
            drawRoundedRect(
                context,
                {
                    x: -fixedRadius,
                    y: -fixedRadius,
                    height: fixedDiameter,
                    width: fixedDiameter,
                },
                {
                    topLeft: borderRadius,
                    topRight: borderRadius,
                    bottomLeft: borderRadius,
                    bottomRight: borderRadius,
                },
            );
        }
    }

    particleInit(container: Container, particle: RoundedParticle): void {
        const shapeData = particle.shapeData as IRoundedRectData | undefined;

        particle.borderRadius = getRangeValue(shapeData?.radius ?? defaultRadius) * container.retina.pixelRatio;
    }
}
