import {
    type ICoordinates,
    drawLine,
    getDistance,
    getDistances,
    getRandom,
    getStyleFromRgb,
    rangeColorToRgb,
} from "@tsparticles/engine";
import type { LinkLineDrawParams, LinkParticle, LinkTriangleDrawParams } from "./Types.js";

/**
 * Draws a triangle with three points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param p1 - The first point of the triangle.
 * @param p2 - The second point of the triangle.
 * @param p3 - The third point of the triangle.
 */
export function drawTriangle(
    context: CanvasRenderingContext2D,
    p1: ICoordinates,
    p2: ICoordinates,
    p3: ICoordinates,
): void {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}

/**
 * @param params -
 */
export function drawLinkLine(params: LinkLineDrawParams): void {
    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    let drawn = false;

    const { begin, end, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;

    if (getDistance(begin, end) <= maxDistance) {
        drawLine(context, begin, end);

        drawn = true;
    } else if (links.warp) {
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

    if (backgroundMask.enable) {
        context.globalCompositeOperation = backgroundMask.composite;
    }

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);

    const { shadow } = links;

    if (shadow.enable) {
        const shadowColor = rangeColorToRgb(shadow.color);

        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = getStyleFromRgb(shadowColor);
        }
    }

    context.stroke();
}

/**
 * @param params -
 */
export function drawLinkTriangle(params: LinkTriangleDrawParams): void {
    const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;

    // this.ctx.lineCap = "round"; /* performance issue */
    /* path */

    drawTriangle(context, pos1, pos2, pos3);

    if (backgroundMask.enable) {
        context.globalCompositeOperation = backgroundMask.composite;
    }

    context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);

    context.fill();
}

/**
 * @param ids -
 * @returns the key for the link
 */
export function getLinkKey(ids: number[]): string {
    ids.sort((a, b) => a - b);

    return ids.join("_");
}

/**
 * @param particles -
 * @param dictionary -
 * @returns the frequency of the link
 */
export function setLinkFrequency(particles: LinkParticle[], dictionary: Map<string, number>): number {
    const key = getLinkKey(particles.map(t => t.id));

    let res = dictionary.get(key);

    if (res === undefined) {
        res = getRandom();

        dictionary.set(key, res);
    }

    return res;
}
