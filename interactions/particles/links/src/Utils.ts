import {
    type ICoordinates,
    type IDimension,
    type IRgb,
    drawLine,
    drawTriangle,
    getDistance,
    getDistances,
    getStyleFromRgb,
    rangeColorToRgb,
} from "tsparticles-engine";
import type { ILinksShadow } from "./Options/Interfaces/ILinksShadow";

type LinkLineDrawParams = {
    backgroundMask: boolean;
    begin: ICoordinates;
    canvasSize: IDimension;
    colorLine: IRgb;
    composite: GlobalCompositeOperation;
    context: CanvasRenderingContext2D;
    end: ICoordinates;
    maxDistance: number;
    opacity: number;
    shadow: ILinksShadow;
    warp: boolean;
    width: number;
};

/**
 * @param params -
 */
export function drawLinkLine(params: LinkLineDrawParams): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    let drawn = false;

    const {
        begin,
        end,
        maxDistance,
        context,
        warp,
        canvasSize,
        width,
        backgroundMask,
        composite,
        colorLine,
        opacity,
        shadow,
    } = params;

    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);

        drawn = true;
    } else if (warp) {
        let pi1: ICoordinates | undefined;
        let pi2: ICoordinates | undefined;

        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };

        const d1 = getDistances(begin, endNE);

        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;

            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        } else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            };

            const d2 = getDistances(begin, endSW);

            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                const xi = -yi / (d2.dy / d2.dx);

                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            } else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                };

                const d3 = getDistances(begin, endSE);

                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);

                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }

        if (pi1 && pi2) {
            drawLine(context, begin, pi1);
            drawLine(context, end, pi2);

            drawn = true;
        }
    }

    if (!drawn) {
        return;
    }

    context.lineWidth = width;

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);

    if (shadow.enable) {
        const shadowColor = rangeColorToRgb(shadow.color);

        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = getStyleFromRgb(shadowColor);
        }
    }

    context.stroke();
}

type LinkTriangleDrawParams = {
    backgroundMask: boolean;
    colorTriangle: IRgb;
    composite: GlobalCompositeOperation;
    context: CanvasRenderingContext2D;
    opacityTriangle: number;
    pos1: ICoordinates;
    pos2: ICoordinates;
    pos3: ICoordinates;
};

/**
 * @param params -
 */
export function drawLinkTriangle(params: LinkTriangleDrawParams): void {
    const { context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle } = params;

    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    drawTriangle(context, pos1, pos2, pos3);

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);

    context.fill();
}
