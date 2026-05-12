import type { Container, IOptions, Options } from "@tsparticles/engine";
import type {
  SVGPathSegArcAbs,
  SVGPathSegArcRel,
  SVGPathSegCurvetoCubicAbs,
  SVGPathSegCurvetoCubicRel,
  SVGPathSegCurvetoCubicSmoothAbs,
  SVGPathSegCurvetoCubicSmoothRel,
  SVGPathSegCurvetoQuadraticAbs,
  SVGPathSegCurvetoQuadraticRel,
  SVGPathSegCurvetoQuadraticSmoothAbs,
  SVGPathSegCurvetoQuadraticSmoothRel,
  SVGPathSegLinetoAbs,
  SVGPathSegLinetoRel,
  SVGPathSegMovetoAbs,
  SVGPathSegMovetoRel,
} from "./pathseg.js";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask.js";
import type { PolygonMask } from "./Options/Classes/PolygonMask.js";

/** SVG path segment types with absolute coordinates */
export type SvgAbsoluteCoordinatesTypes =
  | SVGPathSegArcAbs
  | SVGPathSegCurvetoCubicAbs
  | SVGPathSegCurvetoCubicSmoothAbs
  | SVGPathSegCurvetoQuadraticAbs
  | SVGPathSegCurvetoQuadraticSmoothAbs
  | SVGPathSegLinetoAbs
  | SVGPathSegMovetoAbs;

/** SVG path segment types with relative coordinates */
export type SvgRelativeCoordinatesTypes =
  | SVGPathSegArcRel
  | SVGPathSegCurvetoCubicRel
  | SVGPathSegCurvetoCubicSmoothRel
  | SVGPathSegCurvetoQuadraticRel
  | SVGPathSegCurvetoQuadraticSmoothRel
  | SVGPathSegLinetoRel
  | SVGPathSegMovetoRel;

/** Polygon mask plugin options interface */
export type IPolygonMaskOptions = IOptions & {
  polygon: IPolygonMask;
};

/** Polygon mask plugin options class */
export type PolygonMaskOptions = Options & {
  polygon?: PolygonMask;
};

/** Polygon mask container type */
export type PolygonMaskContainer = Container & {
  actualOptions: PolygonMaskOptions;
};
