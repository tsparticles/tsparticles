'use strict';

// SVGPathSeg API polyfill
//

(function() {
    if (!window.SVGPathSeg) {
        window.SVGPathSeg = function() {
            this.pathSegtype = 0;
            this.pathSegTypeAsLetter = '_';
        }

        SVGPathSeg.PATHSEG_UNKNOWN = "0";
        SVGPathSeg.PATHSEG_CLOSEPATH = "1";      
        SVGPathSeg.PATHSEG_MOVETO_ABS = "2";     
        SVGPathSeg.PATHSEG_MOVETO_REL = "3";     
        SVGPathSeg.PATHSEG_LINETO_ABS = "4";     
        SVGPathSeg.PATHSEG_LINETO_REL = "5";     
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = "6";      
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = "7";      
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = "8";      
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = "9";      
        SVGPathSeg.PATHSEG_ARC_ABS = "10";       
        SVGPathSeg.PATHSEG_ARC_REL = "11";       
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = "12";     
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = "13";     
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = "14";       
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = "15";       
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = "16";      
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = "17";      
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = "18";      
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = "19";
    }

    window.SVGPathSegClosePath = function() {
        this.pathSegType = 1;
        this.pathSegTypeAsLetter = 'Z';
    }
    SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegClosePath = function() {
        return new SVGPathSegClosePath();
    }

    window.SVGPathSegMovetoAbs = function(x, y) {
        this.pathSegType = 2;
        this.pathSegTypeAsLetter = 'M';
        this.x = x;
        this.y = y;
    }
    SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) {
        return new SVGPathSegMovetoAbs(x, y);
    }

    window.SVGPathSegMovetoRel = function(x, y) {
        this.pathSegType = 3;
        this.pathSegTypeAsLetter = 'm';
        this.x = x;
        this.y = y;
    }
    SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) {
        return new SVGPathSegMovetoRel(x, y);
    }

    window.SVGPathSegLinetoAbs = function(x, y) {
        this.pathSegType = 4;
        this.pathSegTypeAsLetter = 'L';
        this.x = x;
        this.y = y;
    }
    SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) {
        return new SVGPathSegLinetoAbs(x, y);
    }

    window.SVGPathSegLinetoRel = function(x, y) {
        this.pathSegType = 5;
        this.pathSegTypeAsLetter = 'l';
        this.x = x;
        this.y = y;
    }
    SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) {
        return new SVGPathSegLinetoRel(x, y);
    }

    window.SVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
        this.pathSegType = 6;
        this.pathSegTypeAsLetter = 'C';
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
        return new SVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2);
    }

    window.SVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
        this.pathSegType = 7;
        this.pathSegTypeAsLetter = 'c';
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
        return new SVGPathSegCurvetoCubicRel(x, y, x1, y1, x2, y2);
    }

    window.SVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
        this.pathSegType = 8;
        this.pathSegTypeAsLetter = 'Q';
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
    }
    SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
        return new SVGPathSegCurvetoQuadraticAbs(x, y, x1, y1);
    }

    window.SVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
        this.pathSegType = 9;
        this.pathSegTypeAsLetter = 'q';
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
    }
    SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
        return new SVGPathSegCurvetoQuadraticRel(x, y, x1, y1);
    }

    window.SVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        this.pathSegType = 10;
        this.pathSegTypeAsLetter = 'A';
        this.x = x;
        this.y = y;
        this.r1 = r1;
        this.r2 = r2;
        this.angle = angle;
        this.largeArcFlag = largeArcFlag;
        this.sweepFlag = sweepFlag;
    }
    SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new SVGPathSegArcAbs(x, y, r1, r2, angle, largeArcFlag, sweepFlag);
    }

    window.SVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        this.pathSegType = 11;
        this.pathSegTypeAsLetter = 'a';
        this.x = x;
        this.y = y;
        this.r1 = r1;
        this.r2 = r2;
        this.angle = angle;
        this.largeArcFlag = largeArcFlag;
        this.sweepFlag = sweepFlag;
    }
    SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new SVGPathSegArcRel(x, y, r1, r2, angle, largeArcFlag, sweepFlag);
    }

    window.SVGPathSegLinetoHorizontalAbs = function(x) {
        this.pathSegType = 12;
        this.pathSegTypeAsLetter = 'H';
        this.x = x;
    }
    SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) {
        return new SVGPathSegLinetoHorizontalAbs(x);
    }

    window.SVGPathSegLinetoHorizontalRel = function(x) {
        this.pathSegType = 13;
        this.pathSegTypeAsLetter = 'h';
        this.x = x;
    }
    SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) {
        return new SVGPathSegLinetoHorizontalRel(x);
    }

    window.SVGPathSegLinetoVerticalAbs = function(y) {
        this.pathSegType = 14;
        this.pathSegTypeAsLetter = 'V';
        this.y = y;
    }
    SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) {
        return new SVGPathSegLinetoVerticalAbs(y);
    }

    window.SVGPathSegLinetoVerticalRel = function(y) {
        this.pathSegType = 15;
        this.pathSegTypeAsLetter = 'v';
        this.y = y;
    }
    SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) {
        return new SVGPathSegLinetoVerticalRel(y);
    }

    window.SVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
        this.pathSegType = 16;
        this.pathSegTypeAsLetter = 'S';
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
    }
    SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
        return new SVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2);
    }

    window.SVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
        this.pathSegType = 17;
        this.pathSegTypeAsLetter = 's';
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
    }
    SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
        return new SVGPathSegCurvetoCubicSmoothRel(x, y, x2, y2);
    }

    window.SVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
        this.pathSegType = 18;
        this.pathSegTypeAsLetter = 'T';
        this.x = x;
        this.y = y;
    }
    SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
        return new SVGPathSegCurvetoQuadraticSmoothAbs(x, y);
    }

    window.SVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
        this.pathSegType = 19;
        this.pathSegTypeAsLetter = 't';
        this.x = x;
        this.y = y;
    }
    SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
    SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
        return new SVGPathSegCurvetoQuadraticSmoothRel(x, y);
    }
}());