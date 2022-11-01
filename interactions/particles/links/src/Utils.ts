import type { ICoordinates, IDimension, IRgb } from "tsparticles-engine";
import {
    drawLine,
    drawTriangle,
    getDistance,
    getDistances,
    getStyleFromRgb,
    rangeColorToRgb,
} from "tsparticles-engine";
import type { ILinksShadow } from "./Options/Interfaces/ILinksShadow";

export function drawLinkLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    maxDistance: number,
    canvasSize: IDimension,
    warp: boolean,
    backgroundMask: boolean,
    composite: GlobalCompositeOperation,
    colorLine: IRgb,
    opacity: number,
    shadow: ILinksShadow
): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    let drawn = false;

    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);

        drawn = true;
    } else if (warp) {
        const offsets = [
            { x: canvasSize.width, y: 0 },
            { x: 0, y: canvasSize.height },
            { x: canvasSize.width, y: canvasSize.height },
        ];

        let pi1: ICoordinates | undefined, pi2: ICoordinates | undefined;

        for (const offset of offsets) {
            const pos2 = {
                    x: end.x + offset.x,
                    y: end.y + offset.y,
                },
                d = getDistances(begin, pos2);

            if (d.dx === 0 && Math.abs(d.dy) <= maxDistance) {
                if (begin.y > end.y) {
                    pi1 = { x: begin.x, y: canvasSize.height };
                    pi2 = { x: end.x, y: 0 };
                } else {
                    pi1 = { x: begin.x, y: 0 };
                    pi2 = { x: end.x, y: canvasSize.height };
                }

                break;
            } else if (d.dy === 0 && Math.abs(d.dx) <= maxDistance) {
                if (begin.x > end.x) {
                    pi1 = { x: canvasSize.width, y: begin.y };
                    pi2 = { x: 0, y: end.y };
                } else {
                    pi1 = { x: 0, y: begin.y };
                    pi2 = { x: canvasSize.width, y: end.y };
                }

                break;
            } else if (d.distance <= maxDistance) {
                const yi = begin.y - (d.dy / d.dx) * begin.x,
                    xi = -yi / (d.dy / d.dx);

                pi1 = { x: xi, y: yi };
                pi2 = { x: pi1.x + offset.x, y: pi1.y + offset.y };

                break;
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

export function drawLinkTriangle(
    context: CanvasRenderingContext2D,
    pos1: ICoordinates,
    pos2: ICoordinates,
    pos3: ICoordinates,
    backgroundMask: boolean,
    composite: GlobalCompositeOperation,
    colorTriangle: IRgb,
    opacityTriangle: number
): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    drawTriangle(context, pos1, pos2, pos3);

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);

    context.fill();
}
