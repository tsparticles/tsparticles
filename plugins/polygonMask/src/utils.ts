import type {
    SVGPathSeg,
    SVGPathSegLinetoHorizontalAbs,
    SVGPathSegLinetoHorizontalRel,
    SVGPathSegLinetoVerticalAbs,
    SVGPathSegLinetoVerticalRel,
} from "./pathseg";
import type { SvgAbsoluteCoordinatesTypes, SvgRelativeCoordinatesTypes } from "./types";
import { Vector, getDistances, getStyleFromRgb, rangeColorToRgb } from "tsparticles-engine";
import type { ICoordinates } from "tsparticles-engine";
import type { IPolygonMaskDrawStroke } from "./Options/Interfaces/IPolygonMaskDrawStroke";
import type { ISvgPath } from "./Interfaces/ISvgPath";

export function drawPolygonMask(
    context: CanvasRenderingContext2D,
    rawData: ICoordinates[],
    stroke: IPolygonMaskDrawStroke
): void {
    const color = rangeColorToRgb(stroke.color);

    if (!color) {
        return;
    }

    context.beginPath();
    context.moveTo(rawData[0].x, rawData[0].y);

    for (const item of rawData) {
        context.lineTo(item.x, item.y);
    }

    context.closePath();
    context.strokeStyle = getStyleFromRgb(color);
    context.lineWidth = stroke.width;
    context.stroke();
}

export function drawPolygonMaskPath(
    context: CanvasRenderingContext2D,
    path: Path2D,
    stroke: IPolygonMaskDrawStroke,
    position: ICoordinates
): void {
    context.translate(position.x, position.y);

    const color = rangeColorToRgb(stroke.color);

    if (!color) {
        return;
    }

    context.strokeStyle = getStyleFromRgb(color, stroke.opacity);
    context.lineWidth = stroke.width;
    context.stroke(path);
}

export function parsePaths(paths: ISvgPath[], scale: number, offset: ICoordinates): ICoordinates[] {
    const res: ICoordinates[] = [];

    for (const path of paths) {
        const segments = path.element.pathSegList,
            len = segments?.numberOfItems ?? 0,
            p = {
                x: 0,
                y: 0,
            };

        for (let i = 0; i < len; i++) {
            const segment: SVGPathSeg | undefined = segments?.getItem(i);
            const svgPathSeg = window.SVGPathSeg;

            switch (segment?.pathSegType) {
                //
                // Absolute
                //
                case svgPathSeg.PATHSEG_MOVETO_ABS:
                case svgPathSeg.PATHSEG_LINETO_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case svgPathSeg.PATHSEG_ARC_ABS:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                    const absSeg = segment as SvgAbsoluteCoordinatesTypes;

                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = (segment as SVGPathSegLinetoHorizontalAbs).x;
                    break;

                case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = (segment as SVGPathSegLinetoVerticalAbs).y;
                    break;

                //
                // Relative
                //
                case svgPathSeg.PATHSEG_LINETO_REL:
                case svgPathSeg.PATHSEG_MOVETO_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case svgPathSeg.PATHSEG_ARC_REL:
                case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                    const relSeg = segment as SvgRelativeCoordinatesTypes;

                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;
                }
                case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += (segment as SVGPathSegLinetoHorizontalRel).x;
                    break;

                case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += (segment as SVGPathSegLinetoVerticalRel).y;
                    break;

                case svgPathSeg.PATHSEG_UNKNOWN:
                case svgPathSeg.PATHSEG_CLOSEPATH:
                    continue; // Skip the closing path (and the UNKNOWN)
            }

            res.push({
                x: p.x * scale + offset.x,
                y: p.y * scale + offset.y,
            });
        }
    }

    return res;
}

export function calcClosestPtOnSegment(
    s1: ICoordinates,
    s2: ICoordinates,
    pos: ICoordinates
): ICoordinates & { isOnSegment: boolean } {
    // calc delta distance: source point to line start, line start to end
    const { dx: dx1, dy: dy1 } = getDistances(pos, s1),
        // calc delta distance:
        { dx: dx2, dy: dy2 } = getDistances(s2, s1),
        // Calc position on line normalized between 0.00 & 1.00
        // == dot product divided by delta line distances squared
        t = (dx1 * dx2 + dy1 * dy2) / (dx2 ** 2 + dy2 ** 2),
        // calc nearest pt on line
        res = {
            x: s1.x + dx2 * t,
            y: s1.y + dy2 * t,
            isOnSegment: t >= 0 && t <= 1,
        };

    // clamp results to being on the segment
    if (t < 0) {
        res.x = s1.x;
        res.y = s1.y;
    } else if (t > 1) {
        res.x = s2.x;
        res.y = s2.y;
    }

    return res;
}

export function segmentBounce(start: ICoordinates, stop: ICoordinates, velocity: Vector): void {
    const { dx, dy } = getDistances(start, stop),
        wallAngle = Math.atan2(dy, dx), // + Math.PI / 2;
        wallNormal = Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)),
        d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);

    wallNormal.multTo(d);

    velocity.subFrom(wallNormal);
}
