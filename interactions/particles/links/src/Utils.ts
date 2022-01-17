import {
    ICoordinates,
    IDimension,
    IRgb,
    colorToRgb,
    drawLine,
    drawTriangle,
    getDistance,
    getDistances,
    getStyleFromRgb,
} from "tsparticles-engine";
import type { ILinksShadow } from "tsparticles-engine";

export function drawLinkLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    maxDistance: number,
    canvasSize: IDimension,
    warp: boolean,
    backgroundMask: boolean,
    composite: string,
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
        const shadowColor = colorToRgb(shadow.color);

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
    composite: string,
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
