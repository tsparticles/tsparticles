'use strict';

// SVGPathSeg API polyfill
//

(function() {
    if (!window.SVGPathSeg) {
        // http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
        window.SVGPathSeg = function() {
            this.pathSegtype = undefined;
            this.pathSegTypeAsLetter = undefined;
        }

        // Path segment types.
        SVGPathSeg.PATHSEG_UNKNOWN = 0;
        SVGPathSeg.PATHSEG_CLOSEPATH = 1;
        SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
        SVGPathSeg.PATHSEG_MOVETO_REL = 3;
        SVGPathSeg.PATHSEG_LINETO_ABS = 4;
        SVGPathSeg.PATHSEG_LINETO_REL = 5;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
        SVGPathSeg.PATHSEG_ARC_ABS = 10;
        SVGPathSeg.PATHSEG_ARC_REL = 11;
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
        SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
        SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
        SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
        SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;

        window.SVGPathSegClosePath = function() {
            this.pathSegType = SVGPathSeg.PATHSEG_CLOSEPATH;
            this.pathSegTypeAsLetter = 'Z';
        }
        SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegMovetoAbs = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_MOVETO_ABS;
            this.pathSegTypeAsLetter = 'M';
            this.x = x;
            this.y = y;
        }
        SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegMovetoRel = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_MOVETO_REL;
            this.pathSegTypeAsLetter = 'm';
            this.x = x;
            this.y = y;
        }
        SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegLinetoAbs = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_ABS;
            this.pathSegTypeAsLetter = 'L';
            this.x = x;
            this.y = y;
        }
        SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegLinetoRel = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_REL;
            this.pathSegTypeAsLetter = 'l';
            this.x = x;
            this.y = y;
        }
        SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
            this.pathSegTypeAsLetter = 'C';
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
            this.pathSegTypeAsLetter = 'c';
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
            this.pathSegTypeAsLetter = 'Q';
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
        }
        SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
            this.pathSegTypeAsLetter = 'q';
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
        }
        SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            this.pathSegType = SVGPathSeg.PATHSEG_ARC_ABS;
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

        window.SVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            this.pathSegType = SVGPathSeg.PATHSEG_ARC_REL;
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

        window.SVGPathSegLinetoHorizontalAbs = function(x) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
            this.pathSegTypeAsLetter = 'H';
            this.x = x;
        }
        SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegLinetoHorizontalRel = function(x) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
            this.pathSegTypeAsLetter = 'h';
            this.x = x;
        }
        SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegLinetoVerticalAbs = function(y) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
            this.pathSegTypeAsLetter = 'V';
            this.y = y;
        }
        SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegLinetoVerticalRel = function(y) {
            this.pathSegType = SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
            this.pathSegTypeAsLetter = 'v';
            this.y = y;
        }
        SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
            this.pathSegTypeAsLetter = 'S';
            this.x = x;
            this.y = y;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
            this.pathSegTypeAsLetter = 's';
            this.x = x;
            this.y = y;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
            this.pathSegTypeAsLetter = 'T';
            this.x = x;
            this.y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);

        window.SVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
            this.pathSegType = SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
            this.pathSegTypeAsLetter = 't';
            this.x = x;
            this.y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);

        // create* methods from http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathElement.
        SVGPathElement.prototype.createSVGPathSegClosePath = function() { return new SVGPathSegClosePath(); }
        SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) { return new SVGPathSegMovetoAbs(x, y); }
        SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) { return new SVGPathSegMovetoRel(x, y); }
        SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) { return new SVGPathSegLinetoAbs(x, y); }
        SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) { return new SVGPathSegLinetoRel(x, y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) { return new SVGPathSegCurvetoCubicRel(x, y, x1, y1, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticAbs(x, y, x1, y1); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) { return new SVGPathSegCurvetoQuadraticRel(x, y, x1, y1); }
        SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcAbs(x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new SVGPathSegArcRel(x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) { return new SVGPathSegLinetoHorizontalAbs(x); }
        SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) { return new SVGPathSegLinetoHorizontalRel(x); }
        SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) { return new SVGPathSegLinetoVerticalAbs(y); }
        SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) { return new SVGPathSegLinetoVerticalRel(y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) { return new SVGPathSegCurvetoCubicSmoothRel(x, y, x2, y2); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) { return new SVGPathSegCurvetoQuadraticSmoothAbs(x, y); }
        SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) { return new SVGPathSegCurvetoQuadraticSmoothRel(x, y); }
    }

    if (!window.SVGPathSegList) {
        // http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
        window.SVGPathSegList = function(pathElement) {
            // TODO: Synchronize from element.
            // TODO: Setup mutation observer on element to listen for 'd' changes.
            this._path = pathElement;
            this._list = [];
            this.numberOfItems = 0;
        }

        SVGPathSegList.clear = function() {
            this._list = [];
            this.numberOfItems = 0;
            // TODO: Synchronize back to element.
            // this._path.setAttribute(d, '');
        }

        SVGPathSegList.initialize = function(newItem) {
            this._list.push(newItem);
            this.numberOfItems = 1;
            // TODO: Synchronize back to element.
            // this._path.setAttribute(d, '');
            return newItem;
        }

        SVGPathSegList.getItem = function(index) {
            return this._list[index];
        }

        SVGPathSegList.insertItemBefore = function(newItem, index) {
            // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
            if (index > this._numberOfItems)
                index = this._numberOfItems;
            this._list.splice(index, 0, newItem);
            // TODO: Synchronize back to element.
            this._numberOfItems++;
            return newItem;
        }

        SVGPathSegList.replaceItem = function(newItem, index) {
            if (index <= 0 || index >= this._numberOfItems - 1)
                throw "INDEX_SIZE_ERR";
            this._list[index] = newItem;
            // TODO: Synchronize back to element.
            return newItem;
        }

        SVGPathSegList.removeItem = function(index) {
            if (index <= 0 || index >= this._numberOfItems - 1)
                throw "INDEX_SIZE_ERR";
            var item = this._list[index];
            this._list.splice(index, 1);
            // TODO: Synchronize back to element.
            return item;
        }

        SVGPathSegList.appendItem = function(newItem) {
            this._list.push(newItem);
            // TODO: Synchronize back to element.
            return newItem;
        }

        // http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
        Object.defineProperty(SVGPathElement.prototype, "pathSegList", { get: function() { return new SVGPathSegList(this); } });
        // FIXME: The following are not implemented and simply return SVGPathElement.pathSegList.
        Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", { get: function() { return new SVGPathSegList(this); } });
        Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", { get: function() { return new SVGPathSegList(this); } });
        Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function() { return new SVGPathSegList(this); } });
    }
}());