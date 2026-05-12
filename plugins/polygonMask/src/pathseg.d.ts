/* eslint-disable */
/** Export value */
export interface SVGElementInstance extends EventTarget {
  /** Correspondingelement value */
  readonly correspondingElement: SVGElement;
  /** Correspondinguseelement value */
  readonly correspondingUseElement: SVGUseElement;
}

/** Interface value */
interface SVGElementInstanceList {
  /** Length value */
  readonly length: number;

  /** Item value */
  item(index: number): SVGElementInstance;
}

/** Interface value */
interface SVGPathSeg {
  /** Pathsegtype value */
  readonly pathSegType: number;
  /** Pathsegtypeasletter value */
  readonly pathSegTypeAsLetter: string;
  /** Absolute arcto path segment type */
  readonly PATHSEG_ARC_ABS: number;
  /** Relative arcto path segment type */
  readonly PATHSEG_ARC_REL: number;
  /** Close path segment type */
  readonly PATHSEG_CLOSEPATH: number;
  /** Absolute cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_ABS: number;
  /** Relative cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_REL: number;
  /** Absolute smooth cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
  /** Relative smooth cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
  /** Absolute quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
  /** Relative quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
  /** Absolute smooth quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
  /** Relative smooth quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
  /** Absolute lineto path segment type */
  readonly PATHSEG_LINETO_ABS: number;
  /** Absolute horizontal lineto path segment type */
  readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
  /** Relative horizontal lineto path segment type */
  readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
  /** Relative lineto path segment type */
  readonly PATHSEG_LINETO_REL: number;
  /** Absolute vertical lineto path segment type */
  readonly PATHSEG_LINETO_VERTICAL_ABS: number;
  /** Relative vertical lineto path segment type */
  readonly PATHSEG_LINETO_VERTICAL_REL: number;
  /** Absolute moveto path segment type */
  readonly PATHSEG_MOVETO_ABS: number;
  /** Relative moveto path segment type */
  readonly PATHSEG_MOVETO_REL: number;
  /** Unknown path segment type */
  readonly PATHSEG_UNKNOWN: number;
}

/** Declare value */
declare var SVGPathSeg: {
  /** Prototype value */
  prototype: SVGPathSeg;
  /** New value */
  new (): SVGPathSeg;
  /** Absolute arcto path segment type */
  readonly PATHSEG_ARC_ABS: number;
  /** Relative arcto path segment type */
  readonly PATHSEG_ARC_REL: number;
  /** Close path segment type */
  readonly PATHSEG_CLOSEPATH: number;
  /** Absolute cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_ABS: number;
  /** Relative cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_REL: number;
  /** Absolute smooth cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
  /** Relative smooth cubic curveto path segment type */
  readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
  /** Absolute quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
  /** Relative quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
  /** Absolute smooth quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
  /** Relative smooth quadratic curveto path segment type */
  readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
  /** Absolute lineto path segment type */
  readonly PATHSEG_LINETO_ABS: number;
  /** Absolute horizontal lineto path segment type */
  readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
  /** Relative horizontal lineto path segment type */
  readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
  /** Relative lineto path segment type */
  readonly PATHSEG_LINETO_REL: number;
  /** Absolute vertical lineto path segment type */
  readonly PATHSEG_LINETO_VERTICAL_ABS: number;
  /** Relative vertical lineto path segment type */
  readonly PATHSEG_LINETO_VERTICAL_REL: number;
  /** Absolute moveto path segment type */
  readonly PATHSEG_MOVETO_ABS: number;
  /** Relative moveto path segment type */
  readonly PATHSEG_MOVETO_REL: number;
  /** Unknown path segment type */
  readonly PATHSEG_UNKNOWN: number;
};

/** Interface value */
interface SVGPathSegArcAbs extends SVGPathSeg {
  /** Angle value */
  angle: number;
  /** Largearcflag value */
  largeArcFlag: boolean;
  /** R1 value */
  r1: number;
  /** R2 value */
  r2: number;
  /** Sweepflag value */
  sweepFlag: boolean;
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegArcAbs: {
  /** Prototype value */
  prototype: SVGPathSegArcAbs;
  /** New value */
  new (): SVGPathSegArcAbs;
};

/** Interface value */
interface SVGPathSegArcRel extends SVGPathSeg {
  /** Angle value */
  angle: number;
  /** Largearcflag value */
  largeArcFlag: boolean;
  /** R1 value */
  r1: number;
  /** R2 value */
  r2: number;
  /** Sweepflag value */
  sweepFlag: boolean;
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegArcRel: {
  /** Prototype value */
  prototype: SVGPathSegArcRel;
  /** New value */
  new (): SVGPathSegArcRel;
};

/** Type value */
type SVGPathSegClosePath = SVGPathSeg;

/** Declare value */
declare var SVGPathSegClosePath: {
  /** Prototype value */
  prototype: SVGPathSegClosePath;
  /** New value */
  new (): SVGPathSegClosePath;
};

/** Interface value */
interface SVGPathSegCurvetoCubicAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** X1 value */
  x1: number;
  /** X2 value */
  x2: number;
  /** Y value */
  y: number;
  /** Y1 value */
  y1: number;
  /** Y2 value */
  y2: number;
}

/** Declare value */
declare var SVGPathSegCurvetoCubicAbs: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoCubicAbs;
  /** New value */
  new (): SVGPathSegCurvetoCubicAbs;
};

/** Interface value */
interface SVGPathSegCurvetoCubicRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** X1 value */
  x1: number;
  /** X2 value */
  x2: number;
  /** Y value */
  y: number;
  /** Y1 value */
  y1: number;
  /** Y2 value */
  y2: number;
}

/** Declare value */
declare var SVGPathSegCurvetoCubicRel: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoCubicRel;
  /** New value */
  new (): SVGPathSegCurvetoCubicRel;
};

/** Interface value */
interface SVGPathSegCurvetoCubicSmoothAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** X2 value */
  x2: number;
  /** Y value */
  y: number;
  /** Y2 value */
  y2: number;
}

/** Declare value */
declare var SVGPathSegCurvetoCubicSmoothAbs: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoCubicSmoothAbs;
  /** New value */
  new (): SVGPathSegCurvetoCubicSmoothAbs;
};

/** Interface value */
interface SVGPathSegCurvetoCubicSmoothRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** X2 value */
  x2: number;
  /** Y value */
  y: number;
  /** Y2 value */
  y2: number;
}

/** Declare value */
declare var SVGPathSegCurvetoCubicSmoothRel: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoCubicSmoothRel;
  /** New value */
  new (): SVGPathSegCurvetoCubicSmoothRel;
};

/** Interface value */
interface SVGPathSegCurvetoQuadraticAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** X1 value */
  x1: number;
  /** Y value */
  y: number;
  /** Y1 value */
  y1: number;
}

/** Declare value */
declare var SVGPathSegCurvetoQuadraticAbs: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoQuadraticAbs;
  /** New value */
  new (): SVGPathSegCurvetoQuadraticAbs;
};

/** Interface value */
interface SVGPathSegCurvetoQuadraticRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** X1 value */
  x1: number;
  /** Y value */
  y: number;
  /** Y1 value */
  y1: number;
}

/** Declare value */
declare var SVGPathSegCurvetoQuadraticRel: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoQuadraticRel;
  /** New value */
  new (): SVGPathSegCurvetoQuadraticRel;
};

/** Interface value */
interface SVGPathSegCurvetoQuadraticSmoothAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegCurvetoQuadraticSmoothAbs: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoQuadraticSmoothAbs;
  /** New value */
  new (): SVGPathSegCurvetoQuadraticSmoothAbs;
};

/** Interface value */
interface SVGPathSegCurvetoQuadraticSmoothRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegCurvetoQuadraticSmoothRel: {
  /** Prototype value */
  prototype: SVGPathSegCurvetoQuadraticSmoothRel;
  /** New value */
  new (): SVGPathSegCurvetoQuadraticSmoothRel;
};

/** Interface value */
interface SVGPathSegLinetoAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegLinetoAbs: {
  /** Prototype value */
  prototype: SVGPathSegLinetoAbs;
  /** New value */
  new (): SVGPathSegLinetoAbs;
};

/** Interface value */
interface SVGPathSegLinetoHorizontalAbs extends SVGPathSeg {
  /** X value */
  x: number;
}

/** Declare value */
declare var SVGPathSegLinetoHorizontalAbs: {
  /** Prototype value */
  prototype: SVGPathSegLinetoHorizontalAbs;
  /** New value */
  new (): SVGPathSegLinetoHorizontalAbs;
};

/** Interface value */
interface SVGPathSegLinetoHorizontalRel extends SVGPathSeg {
  /** X value */
  x: number;
}

/** Declare value */
declare var SVGPathSegLinetoHorizontalRel: {
  /** Prototype value */
  prototype: SVGPathSegLinetoHorizontalRel;
  /** New value */
  new (): SVGPathSegLinetoHorizontalRel;
};

/** Interface value */
interface SVGPathSegLinetoRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegLinetoRel: {
  /** Prototype value */
  prototype: SVGPathSegLinetoRel;
  /** New value */
  new (): SVGPathSegLinetoRel;
};

/** Interface value */
interface SVGPathSegLinetoVerticalAbs extends SVGPathSeg {
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegLinetoVerticalAbs: {
  /** Prototype value */
  prototype: SVGPathSegLinetoVerticalAbs;
  /** New value */
  new (): SVGPathSegLinetoVerticalAbs;
};

/** Interface value */
interface SVGPathSegLinetoVerticalRel extends SVGPathSeg {
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegLinetoVerticalRel: {
  /** Prototype value */
  prototype: SVGPathSegLinetoVerticalRel;
  /** New value */
  new (): SVGPathSegLinetoVerticalRel;
};

/** Interface value */
interface SVGPathSegList {
  /** Numberofitems value */
  readonly numberOfItems: number;

  /** Appenditem value */
  appendItem(newItem: SVGPathSeg): SVGPathSeg;

  /** Clear value */
  clear(): void;

  /** Getitem value */
  getItem(index: number): SVGPathSeg;

  /** Initialize value */
  initialize(newItem: SVGPathSeg): SVGPathSeg;

  /** Insertitembefore value */
  insertItemBefore(newItem: SVGPathSeg, index: number): SVGPathSeg;

  /** Removeitem value */
  removeItem(index: number): SVGPathSeg;

  /** Replaceitem value */
  replaceItem(newItem: SVGPathSeg, index: number): SVGPathSeg;
}

/** Declare value */
declare var SVGPathSegList: {
  /** Prototype value */
  prototype: SVGPathSegList;
  /** New value */
  new (): SVGPathSegList;
};

/** Interface value */
interface SVGPathSegMovetoAbs extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegMovetoAbs: {
  /** Prototype value */
  prototype: SVGPathSegMovetoAbs;
  /** New value */
  new (): SVGPathSegMovetoAbs;
};

/** Interface value */
interface SVGPathSegMovetoRel extends SVGPathSeg {
  /** X value */
  x: number;
  /** Y value */
  y: number;
}

/** Declare value */
declare var SVGPathSegMovetoRel: {
  /** Prototype value */
  prototype: SVGPathSegMovetoRel;
  /** New value */
  new (): SVGPathSegMovetoRel;
};

/** Interface value */
interface SVGZoomAndPan {
  /** Zoomandpan value */
  zoomAndPan: number;
  /** Svg zoomandpan disable value */
  readonly SVG_ZOOMANDPAN_DISABLE: number;
  /** Svg zoomandpan magnify value */
  readonly SVG_ZOOMANDPAN_MAGNIFY: number;
  /** Svg zoomandpan unknown value */
  readonly SVG_ZOOMANDPAN_UNKNOWN: number;
}

/** Interface value */
interface SVGZoomEvent extends UIEvent {
  /** Newscale value */
  readonly newScale: number;
  /** Newtranslate value */
  readonly newTranslate: SVGPoint;
  /** Previousscale value */
  readonly previousScale: number;
  /** Previoustranslate value */
  readonly previousTranslate: SVGPoint;
  /** Zoomrectscreen value */
  readonly zoomRectScreen: SVGRect;
}

/** Declare value */
declare var SVGZoomEvent: {
  /** Prototype value */
  prototype: SVGZoomEvent;
  /** New value */
  new (): SVGZoomEvent;
};

/** Interface value */
interface SVGPathElement extends SVGGraphicsElement {
  /** Pathseglist value */
  readonly pathSegList?: SVGPathSegList;

  /** Getpointatlength value */
  getPointAtLength(distance: number): SVGPoint;

  /** Gettotallength value */
  getTotalLength(): number;
}

/** Declare value */
declare var SVGPathElement: {
  /** Prototype value */
  prototype: SVGPathElement;
  /** New value */
  new (): SVGPathElement;
};

/** Declare value */
declare global {
  /** Var value */
  var SVGPathSeg: SVGPathSeg;
}
