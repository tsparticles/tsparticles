import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask";
import type {
    SVGPathSegArcAbs,
    SVGPathSegCurvetoCubicAbs,
    SVGPathSegCurvetoCubicSmoothAbs,
    SVGPathSegCurvetoQuadraticAbs,
    SVGPathSegCurvetoQuadraticSmoothAbs,
    SVGPathSegLinetoAbs,
    SVGPathSegMovetoAbs,
    SVGPathSegArcRel,
    SVGPathSegCurvetoCubicRel,
    SVGPathSegCurvetoCubicSmoothRel,
    SVGPathSegCurvetoQuadraticRel,
    SVGPathSegCurvetoQuadraticSmoothRel,
    SVGPathSegLinetoRel,
    SVGPathSegMovetoRel,
} from "pathseg";

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

export type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};
