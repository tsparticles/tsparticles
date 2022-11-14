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

export function getLinkPoints(
    begin: ICoordinates,
    end: ICoordinates,
    maxDistance: number,
    warp: boolean,
    canvasSize: IDimension
): { begin: ICoordinates; end: ICoordinates }[] {
    const lines: { begin: ICoordinates; end: ICoordinates }[] = [];

    if (getDistance(begin, end) <= maxDistance) {
        lines.push({ begin, end });
    }

    if (warp) {
        for (const line of getIntermediatePoints(begin, end, canvasSize, maxDistance)) {
            lines.push(line);
        }
    }

    return lines;
}

export function getIntermediatePoints(
    begin: ICoordinates,
    end: ICoordinates,
    canvasSize: IDimension,
    maxDistance: number
): { begin: ICoordinates; end: ICoordinates }[] {
    const offsets = [
        { x: canvasSize.width, y: 0 },
        { x: 0, y: canvasSize.height },
        { x: canvasSize.width, y: canvasSize.height },
        { x: -canvasSize.width, y: 0 },
        { x: 0, y: -canvasSize.height },
        { x: -canvasSize.width, y: -canvasSize.height },
        { x: canvasSize.width, y: -canvasSize.height },
        { x: -canvasSize.width, y: canvasSize.height },
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

        console.log({ pos1, end, d1, begin, pos2, d2, offset });

        if (d1.distance > maxDistance && d2.distance > maxDistance) {
            continue;
        }

        let m: number, q: number, beginPos: ICoordinates, endPos: ICoordinates;

        if (d1.distance <= maxDistance) {
            m = d1.dy / d1.dx;
            q = Number.isFinite(m) ? end.y - m * end.x : begin.x;
            beginPos = pos1;
            endPos = end;
        } else if (d2.distance <= maxDistance) {
            m = d2.dy / d2.dx;
            q = Number.isFinite(m) ? begin.y - m * begin.x : begin.x;
            beginPos = begin;
            endPos = pos2;
        } else {
            return [];
        }

        console.log({ beginPos, endPos, m, q });

        for (const innerOffset of offsets) {
            const px = { x: innerOffset.x, y: m * innerOffset.x + q },
                py = {
                    x: Number.isFinite(m) ? innerOffset.y - q / m : q,
                    y: Number.isFinite(m) ? innerOffset.y : offset.y,
                };

            console.log({ beginPos, endPos, px, py, innerOffset });

            if (isPointBetweenPoints(px, beginPos, endPos)) {
                const db = getDistance(beginPos, px),
                    de = getDistance(endPos, px);

                console.log("px between points", db, de);

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

                console.log("py between points", db, de);

                const yi = offset.y - py.y,
                    xi = (yi - q) / m;

                if (yi >= 0 && xi >= 0) {
                    if (db < de) {
                        pi1 = { x: xi, y: yi };
                        pi2 = py;
                    } else {
                        pi1 = py;
                        pi2 = { x: xi, y: yi };
                    }
                }
            }

            if (pi1 && pi2) {
                break;
            }
        }
    }

    if (pi1 && pi2) {
        return [
            { begin, end: pi1 },
            { begin: end, end: pi2 },
        ];
    }

    return [];
}

export function isPointBetweenPoints(check: ICoordinates, begin: ICoordinates, end: ICoordinates): boolean {
    return (
        ((begin.x >= check.x && check.x >= end.x) || (begin.x <= check.x && check.x <= end.x)) &&
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
    const lines = getLinkPoints(begin, end, maxDistance, warp, canvasSize);

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
