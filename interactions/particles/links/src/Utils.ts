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

function isPointBetweenPoints(check: ICoordinates, begin: ICoordinates, end: ICoordinates): boolean {
    return (
        ((begin.x > check.x && check.x > end.x) || (begin.x < check.x && check.x < end.x)) &&
        ((begin.y >= check.y && check.y >= end.y) || (begin.y <= check.y && check.y <= end.y))
    );
}

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
    const lines: { begin: ICoordinates; end: ICoordinates }[] = [];

    if (!warp) {
        if (getDistance(begin, end) <= maxDistance) {
            lines.push({ begin, end });
        }
    } else {
        const offsets = [
            { x: 0, y: 0 },
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
                const m = d.dy / d.dx,
                    q = begin.y - m * begin.x,
                    px0 = {
                        x: 0,
                        y: q,
                    },
                    py0 = {
                        x: -q / m,
                        y: 0,
                    },
                    pxMax = {
                        x: canvasSize.width,
                        y: m * canvasSize.width + q,
                    },
                    pyMax = {
                        x: (canvasSize.height - q) / m,
                        y: canvasSize.height,
                    };

                if (isPointBetweenPoints(py0, begin, pos2)) {
                    const db = getDistance(begin, py0),
                        de = getDistance(pos2, py0);

                    if (db < de) {
                        pi1 = py0;
                        pi2 = { x: canvasSize.width, y: m * canvasSize.width + q };
                    } else {
                        pi1 = { x: canvasSize.width, y: m * canvasSize.width + q };
                        pi2 = py0;
                    }
                } else if (isPointBetweenPoints(px0, begin, pos2)) {
                    const db = getDistance(begin, px0),
                        de = getDistance(pos2, px0);

                    if (db < de) {
                        pi1 = px0;
                        pi2 = { x: -q / m, y: canvasSize.height };
                    } else {
                        pi1 = { x: -q / m, y: canvasSize.height };
                        pi2 = px0;
                    }
                } else if (isPointBetweenPoints(pyMax, begin, pos2)) {
                    const db = getDistance(begin, pyMax),
                        de = getDistance(pos2, pyMax);

                    if (db < de) {
                        pi1 = pyMax;
                        pi2 = { x: 0, y: q };
                    } else {
                        pi1 = { x: 0, y: q };
                        pi2 = pyMax;
                    }
                } else if (isPointBetweenPoints(pxMax, begin, pos2)) {
                    const db = getDistance(begin, pxMax),
                        de = getDistance(pos2, pxMax);

                    if (db < de) {
                        pi1 = pxMax;
                        pi2 = { x: (canvasSize.height - q) / m, y: canvasSize.height };
                    } else {
                        pi1 = { x: (canvasSize.height - q) / m, y: canvasSize.height };
                        pi2 = pxMax;
                    }
                }

                break;
            }
        }

        if (pi1 && pi2) {
            lines.push({ begin, end: pi1 });
            lines.push({ begin: end, end: pi2 });
        }
    }

    if (!lines.length) {
        return;
    }

    for (const line of lines) {
        drawLine(context, line.begin, line.end);

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
