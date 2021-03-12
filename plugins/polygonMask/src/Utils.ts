import type { IDrawStroke } from "./Options/Interfaces/IDrawStroke";
import type { ISvgPath } from "./Interfaces/ISvgPath";
import type { ICoordinates, Particle } from "tsparticles-engine";
import { colorToRgb, getStyleFromRgb } from "tsparticles-engine";

export type SvgAbsoluteCoordinatesTypes =
    | SVGPathSegArcAbs
    | SVGPathSegCurvetoCubicAbs
    | SVGPathSegCurvetoCubicSmoothAbs
    | SVGPathSegCurvetoQuadraticAbs
    | SVGPathSegCurvetoQuadraticSmoothAbs
    | SVGPathSegLinetoAbs
    | SVGPathSegMovetoAbs;

export type SvgRelativeCoordinatesTypes =
    | SVGPathSegArcRel
    | SVGPathSegCurvetoCubicRel
    | SVGPathSegCurvetoCubicSmoothRel
    | SVGPathSegCurvetoQuadraticRel
    | SVGPathSegCurvetoQuadraticSmoothRel
    | SVGPathSegLinetoRel
    | SVGPathSegMovetoRel;

export function polygonBounce(particle: Particle): void {
    particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
}

export function drawPolygonMask(context: CanvasRenderingContext2D, rawData: ICoordinates[], stroke: IDrawStroke): void {
    const color = colorToRgb(stroke.color);

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
    stroke: IDrawStroke,
    position: ICoordinates
): void {
    context.translate(position.x, position.y);

    const color = colorToRgb(stroke.color);

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
        const segments = path.element.pathSegList;
        const len = segments.numberOfItems;
        const p = {
            x: 0,
            y: 0,
        };

        for (let i = 0; i < len; i++) {
            const segment: SVGPathSeg = segments.getItem(i);
            const svgPathSeg = window.SVGPathSeg;

            switch (segment.pathSegType) {
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
