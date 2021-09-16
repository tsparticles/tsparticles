export interface SVGElementInstance extends EventTarget {
    readonly correspondingElement: SVGElement;
    readonly correspondingUseElement: SVGUseElement;
}

interface SVGElementInstanceList {
    readonly length: number;

    item(index: number): SVGElementInstance;
}

interface SVGPathSeg {
    readonly pathSegType: number;
    readonly pathSegTypeAsLetter: string;
    readonly PATHSEG_ARC_ABS: number;
    readonly PATHSEG_ARC_REL: number;
    readonly PATHSEG_CLOSEPATH: number;
    readonly PATHSEG_CURVETO_CUBIC_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_REL: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    readonly PATHSEG_LINETO_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
    readonly PATHSEG_LINETO_REL: number;
    readonly PATHSEG_LINETO_VERTICAL_ABS: number;
    readonly PATHSEG_LINETO_VERTICAL_REL: number;
    readonly PATHSEG_MOVETO_ABS: number;
    readonly PATHSEG_MOVETO_REL: number;
    readonly PATHSEG_UNKNOWN: number;
}

declare var SVGPathSeg: {
    prototype: SVGPathSeg;
    new (): SVGPathSeg;
    readonly PATHSEG_ARC_ABS: number;
    readonly PATHSEG_ARC_REL: number;
    readonly PATHSEG_CLOSEPATH: number;
    readonly PATHSEG_CURVETO_CUBIC_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_REL: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_CUBIC_SMOOTH_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_REL: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: number;
    readonly PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: number;
    readonly PATHSEG_LINETO_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_ABS: number;
    readonly PATHSEG_LINETO_HORIZONTAL_REL: number;
    readonly PATHSEG_LINETO_REL: number;
    readonly PATHSEG_LINETO_VERTICAL_ABS: number;
    readonly PATHSEG_LINETO_VERTICAL_REL: number;
    readonly PATHSEG_MOVETO_ABS: number;
    readonly PATHSEG_MOVETO_REL: number;
    readonly PATHSEG_UNKNOWN: number;
};

interface SVGPathSegArcAbs extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcAbs: {
    prototype: SVGPathSegArcAbs;
    new (): SVGPathSegArcAbs;
};

interface SVGPathSegArcRel extends SVGPathSeg {
    angle: number;
    largeArcFlag: boolean;
    r1: number;
    r2: number;
    sweepFlag: boolean;
    x: number;
    y: number;
}

declare var SVGPathSegArcRel: {
    prototype: SVGPathSegArcRel;
    new (): SVGPathSegArcRel;
};

type SVGPathSegClosePath = SVGPathSeg;

declare var SVGPathSegClosePath: {
    prototype: SVGPathSegClosePath;
    new (): SVGPathSegClosePath;
};

interface SVGPathSegCurvetoCubicAbs extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicAbs: {
    prototype: SVGPathSegCurvetoCubicAbs;
    new (): SVGPathSegCurvetoCubicAbs;
};

interface SVGPathSegCurvetoCubicRel extends SVGPathSeg {
    x: number;
    x1: number;
    x2: number;
    y: number;
    y1: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicRel: {
    prototype: SVGPathSegCurvetoCubicRel;
    new (): SVGPathSegCurvetoCubicRel;
};

interface SVGPathSegCurvetoCubicSmoothAbs extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothAbs: {
    prototype: SVGPathSegCurvetoCubicSmoothAbs;
    new (): SVGPathSegCurvetoCubicSmoothAbs;
};

interface SVGPathSegCurvetoCubicSmoothRel extends SVGPathSeg {
    x: number;
    x2: number;
    y: number;
    y2: number;
}

declare var SVGPathSegCurvetoCubicSmoothRel: {
    prototype: SVGPathSegCurvetoCubicSmoothRel;
    new (): SVGPathSegCurvetoCubicSmoothRel;
};

interface SVGPathSegCurvetoQuadraticAbs extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticAbs: {
    prototype: SVGPathSegCurvetoQuadraticAbs;
    new (): SVGPathSegCurvetoQuadraticAbs;
};

interface SVGPathSegCurvetoQuadraticRel extends SVGPathSeg {
    x: number;
    x1: number;
    y: number;
    y1: number;
}

declare var SVGPathSegCurvetoQuadraticRel: {
    prototype: SVGPathSegCurvetoQuadraticRel;
    new (): SVGPathSegCurvetoQuadraticRel;
};

interface SVGPathSegCurvetoQuadraticSmoothAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothAbs: {
    prototype: SVGPathSegCurvetoQuadraticSmoothAbs;
    new (): SVGPathSegCurvetoQuadraticSmoothAbs;
};

interface SVGPathSegCurvetoQuadraticSmoothRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegCurvetoQuadraticSmoothRel: {
    prototype: SVGPathSegCurvetoQuadraticSmoothRel;
    new (): SVGPathSegCurvetoQuadraticSmoothRel;
};

interface SVGPathSegLinetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoAbs: {
    prototype: SVGPathSegLinetoAbs;
    new (): SVGPathSegLinetoAbs;
};

interface SVGPathSegLinetoHorizontalAbs extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalAbs: {
    prototype: SVGPathSegLinetoHorizontalAbs;
    new (): SVGPathSegLinetoHorizontalAbs;
};

interface SVGPathSegLinetoHorizontalRel extends SVGPathSeg {
    x: number;
}

declare var SVGPathSegLinetoHorizontalRel: {
    prototype: SVGPathSegLinetoHorizontalRel;
    new (): SVGPathSegLinetoHorizontalRel;
};

interface SVGPathSegLinetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegLinetoRel: {
    prototype: SVGPathSegLinetoRel;
    new (): SVGPathSegLinetoRel;
};

interface SVGPathSegLinetoVerticalAbs extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalAbs: {
    prototype: SVGPathSegLinetoVerticalAbs;
    new (): SVGPathSegLinetoVerticalAbs;
};

interface SVGPathSegLinetoVerticalRel extends SVGPathSeg {
    y: number;
}

declare var SVGPathSegLinetoVerticalRel: {
    prototype: SVGPathSegLinetoVerticalRel;
    new (): SVGPathSegLinetoVerticalRel;
};

interface SVGPathSegList {
    readonly numberOfItems: number;

    appendItem(newItem: SVGPathSeg): SVGPathSeg;

    clear(): void;

    getItem(index: number): SVGPathSeg;

    initialize(newItem: SVGPathSeg): SVGPathSeg;

    insertItemBefore(newItem: SVGPathSeg, index: number): SVGPathSeg;

    removeItem(index: number): SVGPathSeg;

    replaceItem(newItem: SVGPathSeg, index: number): SVGPathSeg;
}

declare var SVGPathSegList: {
    prototype: SVGPathSegList;
    new (): SVGPathSegList;
};

interface SVGPathSegMovetoAbs extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoAbs: {
    prototype: SVGPathSegMovetoAbs;
    new (): SVGPathSegMovetoAbs;
};

interface SVGPathSegMovetoRel extends SVGPathSeg {
    x: number;
    y: number;
}

declare var SVGPathSegMovetoRel: {
    prototype: SVGPathSegMovetoRel;
    new (): SVGPathSegMovetoRel;
};

interface SVGZoomAndPan {
    zoomAndPan: number;
    readonly SVG_ZOOMANDPAN_DISABLE: number;
    readonly SVG_ZOOMANDPAN_MAGNIFY: number;
    readonly SVG_ZOOMANDPAN_UNKNOWN: number;
}

interface SVGZoomEvent extends UIEvent {
    readonly newScale: number;
    readonly newTranslate: SVGPoint;
    readonly previousScale: number;
    readonly previousTranslate: SVGPoint;
    readonly zoomRectScreen: SVGRect;
}

declare var SVGZoomEvent: {
    prototype: SVGZoomEvent;
    new (): SVGZoomEvent;
};

interface SVGPathElement extends SVGGraphicsElement {
    readonly pathSegList?: SVGPathSegList;

    getPointAtLength(distance: number): SVGPoint;

    getTotalLength(): number;
}

declare var SVGPathElement: {
    prototype: SVGPathElement;
    new (): SVGPathElement;
};

declare global {
    interface Window {
        SVGPathSeg: SVGPathSeg;
    }
}
