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

let printed = false;

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
            const pos1 = {
                    x: begin.x + offset.x,
                    y: begin.y + offset.y,
                },
                d1 = getDistances(pos1, end),
                pos2 = {
                    x: end.x + offset.x,
                    y: end.y + offset.y,
                },
                d2 = getDistances(begin, pos2);

            if (d1.dx === 0 || d2.dx === 0) {
                if (Math.abs(d1.dy) > maxDistance && Math.abs(d2.dy) > maxDistance) {
                    continue;
                }

                if (begin.y > end.y) {
                    pi1 = { x: begin.x, y: canvasSize.height };
                    pi2 = { x: end.x, y: 0 };
                } else {
                    pi1 = { x: begin.x, y: 0 };
                    pi2 = { x: end.x, y: canvasSize.height };
                }

                break;
            } else if (d1.dy === 0 || d2.dy === 0) {
                if (Math.abs(d1.dx) > maxDistance && Math.abs(d2.dx) > maxDistance) {
                    continue;
                }

                if (begin.x > end.x) {
                    pi1 = { x: canvasSize.width, y: begin.y };
                    pi2 = { x: 0, y: end.y };
                } else {
                    pi1 = { x: 0, y: begin.y };
                    pi2 = { x: canvasSize.width, y: end.y };
                }

                break;
            } else {
                if (d1.distance > maxDistance && d2.distance > maxDistance) {
                    continue;
                }

                let m: number, q: number, beginPos: ICoordinates, endPos: ICoordinates;

                if (d1.distance <= maxDistance) {
                    m = d1.dy / d1.dx;
                    q = end.y - m * end.x;
                    beginPos = pos1;
                    endPos = end;
                } else {
                    m = d2.dy / d2.dx;
                    q = begin.y - m * begin.x;
                    beginPos = begin;
                    endPos = pos2;
                }

                for (const innerOffset of offsets) {
                    const px = { x: innerOffset.x, y: m * innerOffset.x + q },
                        py = { x: (innerOffset.y - q) / m, y: innerOffset.y };

                    if (isPointBetweenPoints(px, beginPos, endPos)) {
                        const db = getDistance(beginPos, px),
                            de = getDistance(endPos, px);

                        const xi = offset.x - px.x,
                            yi = m * xi + q;

                        if (db < de) {
                            pi1 = { x: xi, y: yi };
                            pi2 = px;
                        } else {
                            pi1 = px;
                            pi2 = { x: xi, y: yi };
                        }
                    } else if (isPointBetweenPoints(py, beginPos, endPos)) {
                        const db = getDistance(beginPos, py),
                            de = getDistance(endPos, py);

                        const yi = offset.y - py.y,
                            xi = (yi - q) / m;

                        if (db < de) {
                            pi1 = { x: xi, y: yi };
                            pi2 = py;
                        } else {
                            pi1 = py;
                            pi2 = { x: xi, y: yi };
                        }
                    }

                    if (pi1 && pi2) {
                        if (!printed) {
                            printed = true;

                            console.log(beginPos, endPos, pi1, pi2);
                        }

                        break;
                    }
                }

                /*const px0 = {
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

                if (isPointBetweenPoints(py0, beginPos, endPos)) {
                    const db = getDistance(beginPos, py0),
                        de = getDistance(endPos, py0);

                    if (db < de) {
                        pi1 = py0;
                        pi2 = { x: canvasSize.width, y: m * canvasSize.width + q };
                    } else {
                        pi1 = { x: canvasSize.width, y: m * canvasSize.width + q };
                        pi2 = py0;
                    }
                } else if (isPointBetweenPoints(px0, beginPos, endPos)) {
                    const db = getDistance(beginPos, px0),
                        de = getDistance(endPos, px0);

                    if (db < de) {
                        pi1 = px0;
                        pi2 = { x: -q / m, y: canvasSize.height };
                    } else {
                        pi1 = { x: -q / m, y: canvasSize.height };
                        pi2 = px0;
                    }
                } else if (isPointBetweenPoints(pyMax, beginPos, endPos)) {
                    const db = getDistance(beginPos, pyMax),
                        de = getDistance(endPos, pyMax);

                    if (db < de) {
                        pi1 = pyMax;
                        pi2 = { x: 0, y: q };
                    } else {
                        pi1 = { x: 0, y: q };
                        pi2 = pyMax;
                    }
                } else if (isPointBetweenPoints(pxMax, beginPos, endPos)) {
                    const db = getDistance(beginPos, pxMax),
                        de = getDistance(endPos, pxMax);

                    if (db < de) {
                        pi1 = pxMax;
                        pi2 = { x: (canvasSize.height - q) / m, y: canvasSize.height };
                    } else {
                        pi1 = { x: (canvasSize.height - q) / m, y: canvasSize.height };
                        pi2 = pxMax;
                    }
                }*/

                if (pi1 && pi2) {
                    break;
                }
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
