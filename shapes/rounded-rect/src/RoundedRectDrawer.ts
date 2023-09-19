import type { Container, IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import type { IRoundedRectData } from "./IRoundedRectData.js";
import type { RadiusInfo } from "./RadiusInfo.js";
import type { RectInfo } from "./RectInfo.js";
import type { RoundedParticle } from "./RoundedParticle.js";
import { getRangeValue } from "@tsparticles/engine";

const fixFactor = Math.sqrt(2),
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
            fixedDiameter = fixedRadius * 2,
            borderRadius = particle.borderRadius ?? 5;

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
        const shapeData = particle.shapeData as IRoundedRectData;

        particle.borderRadius = getRangeValue(shapeData?.radius ?? 5) * container.retina.pixelRatio;
    }
}
