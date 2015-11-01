"use strict";

// SVGPathSeg API polyfill
//

(function() {
    if (!window.SVGPathSeg) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
        window.SVGPathSeg = function(type, typeAsLetter) {
            this.pathSegType = type;
            this.pathSegTypeAsLetter = typeAsLetter;
        }

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
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CLOSEPATH, "z");
        }
        SVGPathSegClosePath.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegClosePath.prototype._asString = function() { return this.pathSegTypeAsLetter; }

        window.SVGPathSegMovetoAbs = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_ABS, "M");
            this.x = x;
            this.y = y;
        }
        SVGPathSegMovetoAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegMovetoAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        window.SVGPathSegMovetoRel = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_MOVETO_REL, "m");
            this.x = x;
            this.y = y;
        }
        SVGPathSegMovetoRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegMovetoRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        window.SVGPathSegLinetoAbs = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_ABS, "L");
            this.x = x;
            this.y = y;
        }
        SVGPathSegLinetoAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        window.SVGPathSegLinetoRel = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_REL, "l");
            this.x = x;
            this.y = y;
        }
        SVGPathSegLinetoRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C");
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x1 + " " + this.y1 + " " + this.x2 + " " + this.y2 + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c");
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x1 + " " + this.y1 + " " + this.x2 + " " + this.y2 + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q");
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
        }
        SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x1 + " " + this.y1 + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q");
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
        }
        SVGPathSegCurvetoQuadraticRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x1 + " " + this.y1 + " " + this.x + " " + this.y; }

        window.SVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_ABS, "A");
            this.x = x;
            this.y = y;
            this.r1 = r1;
            this.r2 = r2;
            this.angle = angle;
            this.largeArcFlag = largeArcFlag;
            this.sweepFlag = sweepFlag;
        }
        SVGPathSegArcAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegArcAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.r1 + " " + this.r2 + " " + this.angle + " " + (this.largeArcFlag ? "1" : "0") + " " + (this.sweepFlag ? "1" : "0") + " " + this.x + " " + this.y; }

        window.SVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_ARC_REL, "a");
            this.x = x;
            this.y = y;
            this.r1 = r1;
            this.r2 = r2;
            this.angle = angle;
            this.largeArcFlag = largeArcFlag;
            this.sweepFlag = sweepFlag;
        }
        SVGPathSegArcRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegArcRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.r1 + " " + this.r2 + " " + this.angle + " " + (this.largeArcFlag ? "1" : "0") + " " + (this.sweepFlag ? "1" : "0") + " " + this.x + " " + this.y; }

        window.SVGPathSegLinetoHorizontalAbs = function(x) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H");
            this.x = x;
        }
        SVGPathSegLinetoHorizontalAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoHorizontalAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x; }

        window.SVGPathSegLinetoHorizontalRel = function(x) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h");
            this.x = x;
        }
        SVGPathSegLinetoHorizontalRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoHorizontalRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x; }

        window.SVGPathSegLinetoVerticalAbs = function(y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V");
            this.y = y;
        }
        SVGPathSegLinetoVerticalAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoVerticalAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.y; }

        window.SVGPathSegLinetoVerticalRel = function(y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v");
            this.y = y;
        }
        SVGPathSegLinetoVerticalRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegLinetoVerticalRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.y; }

        window.SVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S");
            this.x = x;
            this.y = y;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicSmoothAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x2 + " " + this.y2 + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s");
            this.x = x;
            this.y = y;
            this.x2 = x2;
            this.y2 = y2;
        }
        SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoCubicSmoothRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x2 + " " + this.y2 + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T");
            this.x = x;
            this.y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        window.SVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
            SVGPathSeg.call(this, SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t");
            this.x = x;
            this.y = y;
        }
        SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(SVGPathSeg.prototype);
        SVGPathSegCurvetoQuadraticSmoothRel.prototype._asString = function() { return this.pathSegTypeAsLetter + " " + this.x + " " + this.y; }

        // Add createSVGPathSeg* functions to SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathElement.
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
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
        window.SVGPathSegList = function(pathElement) {
            this._path = pathElement;
            this._list = SVGPathSegList._parsePath(this._path.getAttribute("d"));
            this.numberOfItems = this._list.length;

            // Use a MutationObserver to catch changes to the path.
            this._pathMutationObserver = new MutationObserver(this._synchronizePathToList);
            this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
            this._pathMutationObserver.observe(this._path, this._mutationObserverConfig);
        }

        SVGPathSegList.prototype._synchronizePathToList = function() {
            this._path = SVGPathSegList._parsePath(this._path.getAttribute("d"));
            this.numberOfItems = this._path.length;
        }

        SVGPathSegList.prototype._synchronizeListToPath = function() {
            this._pathMutationObserver.disable();
            this._path.setAttribute("d", SVGPathSegList._pathSegArrayAsString(this._path));
            this._pathMutationObserver.observe(this._path, this._mutationObserverConfig);
        }

        SVGPathSegList.prototype.clear = function() {
            this._list = [];
            this.numberOfItems = 0;
            this._synchronizeListToPath();
        }

        SVGPathSegList.prototype.initialize = function(newItem) {
            this._list.push(newItem);
            this.numberOfItems = 1;
            this._synchronizeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype.getItem = function(index) {
            return this._list[index];
        }

        SVGPathSegList.prototype.insertItemBefore = function(newItem, index) {
            // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
            if (index > this._numberOfItems)
                index = this._numberOfItems;
            this._list.splice(index, 0, newItem);
            this._numberOfItems++;
            this._synchronizeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype.replaceItem = function(newItem, index) {
            if (index <= 0 || index >= this._numberOfItems - 1)
                throw "INDEX_SIZE_ERR";
            this._list[index] = newItem;
            this._synchronizeListToPath();
            return newItem;
        }

        SVGPathSegList.prototype.removeItem = function(index) {
            if (index <= 0 || index >= this._numberOfItems - 1)
                throw "INDEX_SIZE_ERR";
            var item = this._list[index];
            this._list.splice(index, 1);
            this._synchronizeListToPath();
            return item;
        }

        SVGPathSegList.prototype.appendItem = function(newItem) {
            this._list.push(newItem);
            // TODO: Optimize this to just append to the existing attribute.
            this._synchronizeListToPath();
            return newItem;
        }

        SVGPathSegList._pathSegArrayAsString = function(pathSegArray) {
            var string = "";
            var first = true;
            pathSegArray.forEach(function(pathSeg) {
                if (first) {
                    first = false;
                    string += pathSeg._asString();
                } else {
                    string += " " + pathSeg._asString();
                }
            });
            return string;
        }

        SVGPathSegList._parsePath = function(string) {
            if (!string || string.length == 0)
                return [];

            var PathSegmentData = function() {
                this.command = SVGPathSeg.PATHSEG_UNKNOWN;
                this.targetPointX = undefined;
                this.targetPointY = undefined;
                this.point1X = undefined;
                this.point1Y = undefined;
                this.point2X = undefined;
                this.point2Y = undefined;
                this.arcSweep = false;
                this.arcLarge = false;
            }
            PathSegmentData.prototype.arcRadiiX = function() { return this.point1X; }
            PathSegmentData.prototype.setArcRadiiX = function(x) { this.point1X = x; }
            PathSegmentData.prototype.arcRadiiY = function() { return this.point1Y; }
            PathSegmentData.prototype.setArcRadiiY = function(y) { this.point1Y = y; }
            PathSegmentData.prototype.arcAngle = function() { return this.point2X; }
            PathSegmentData.prototype.setArcAngle = function(angle) { this.point2X = angle; }
            PathSegmentData.prototype.r1 = function() { return this.point1X; }
            PathSegmentData.prototype.r2 = function() { return this.poing1Y; }
            PathSegmentData.prototype.x = function() { return this.targetPointX; }
            PathSegmentData.prototype.y = function() { return this.targetPointY; }
            PathSegmentData.prototype.x1 = function() { return this.point1X; }
            PathSegmentData.prototype.y1 = function() { return this.point1Y; }
            PathSegmentData.prototype.x2 = function() { return this.point2X; }
            PathSegmentData.prototype.y2 = function() { return this.point2Y; }

            var Builder = function() {
                this.path = [];
                this._closed = true;
            }

            Builder.prototype.appendSegment = function(segment) {
                switch (segment.command) {
                case SVGPathSeg.PATHSEG_MOVETO_REL:
                    this.path.push(new SVGPathSegMovetoRel(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_MOVETO_ABS:
                    this.path.push(new SVGPathSegMovetoAbs(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_REL:
                    this.path.push(new SVGPathSegLinetoRel(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_ABS:
                    this.path.push(new SVGPathSegLinetoAbs(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    this.path.push(new SVGPathSegLinetoHorizontalRel(segment.targetPointX));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    this.path.push(new SVGPathSegLinetoHorizontalAbs(segment.targetPointX));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    this.path.push(new SVGPathSegLinetoVerticalRel(segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    this.path.push(new SVGPathSegLinetoVerticalAbs(segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_CLOSEPATH:
                    this.path.push(new SVGPathSegClosePath());
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                    this.path.push(new SVGPathSegCurvetoCubicRel(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y, segment.point2X, segment.point2Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    this.path.push(new SVGPathSegCurvetoCubicAbs(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y, segment.point2X, segment.point2Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                    this.path.push(new SVGPathSegCurvetoCubicSmoothRel(segment.targetPointX, segment.targetPointY, segment.point2X, segment.point2Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                    this.path.push(new SVGPathSegCurvetoCubicSmoothAbs(segment.targetPointX, segment.targetPointY, segment.point2X, segment.point2Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                    this.path.push(new SVGPathSegCurvetoQuadraticRel(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                    this.path.push(new SVGPathSegCurvetoQuadraticAbs(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                    this.path.push(new SVGPathSegCurvetoQuadraticSmoothRel(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                    this.path.push(new SVGPathSegCurvetoQuadraticSmoothAbs(segment.targetPointX, segment.targetPointY));
                    break;
                case SVGPathSeg.PATHSEG_ARC_REL:
                    this.path.push(new SVGPathSegArcRel(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y, segment.arcAngle(), segment.arcLarge, segment.arcSweep));
                    break;
                case SVGPathSeg.PATHSEG_ARC_ABS:
                    this.path.push(new SVGPathSegArcAbs(segment.targetPointX, segment.targetPointY, segment.point1X, segment.point1Y, segment.arcAngle(), segment.arcLarge, segment.arcSweep));
                    break;
                default:
                    throw "Unknown path seg type."
                }
            }

            var Source = function(string) {
                this._string = string;
                this._currentIndex = 0;
                this._endIndex = this._string.length;
                this._previousCommand = SVGPathSeg.PATHSEG_UNKNOWN;

                this._skipOptionalSpaces();
            }

            Source.prototype._isCurrentSpace = function() {
                var character = this._string[this._currentIndex];
                return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
            }

            Source.prototype._skipOptionalSpaces = function() {
                while (this._currentIndex < this._endIndex && this._isCurrentSpace())
                    this._currentIndex++;
                return this._currentIndex < this._endIndex;
            }

            Source.prototype._skipOptionalSpacesOrDelimiter = function() {
                if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
                    return false;
                if (this._skipOptionalSpaces()) {
                    if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                        this._currentIndex++;
                        this._skipOptionalSpaces();
                    }
                }
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.hasMoreData = function() {
                return this._currentIndex < this._endIndex;
            }

            Source.prototype.peekSegmentType = function() {
                var lookahead = this._string[this._currentIndex];
                return this._parseSVGSegmentTypeHelper(lookahead);
            }

            Source.prototype._parseSVGSegmentTypeHelper = function(lookahead) {
                switch (lookahead) {
                case "Z":
                case "z":
                    return SVGPathSeg.PATHSEG_CLOSEPATH;
                case "M":
                    return SVGPathSeg.PATHSEG_MOVETO_ABS;
                case "m":
                    return SVGPathSeg.PATHSEG_MOVETO_REL;
                case "L":
                    return SVGPathSeg.PATHSEG_LINETO_ABS;
                case "l":
                    return SVGPathSeg.PATHSEG_LINETO_REL;
                case "C":
                    return SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                case "c":
                    return SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                case "Q":
                    return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                case "q":
                    return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                case "A":
                    return SVGPathSeg.PATHSEG_ARC_ABS;
                case "a":
                    return SVGPathSeg.PATHSEG_ARC_REL;
                case "H":
                    return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                case "h":
                    return SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                case "V":
                    return SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                case "v":
                    return SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                case "S":
                    return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                case "s":
                    return SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                case "T":
                    return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                case "t":
                    return SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                default:
                    return SVGPathSeg.PATHSEG_UNKNOWN;
                }
            }

            Source.prototype._nextCommandHelper = function(lookahead, previousCommand) {
                // Check for remaining coordinates in the current command.
                if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) && previousCommand != SVGPathSeg.PATHSEG_CLOSEPATH) {
                    if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_ABS)
                        return SVGPathSeg.PATHSEG_LINETO_ABS;
                    if (previousCommand == SVGPathSeg.PATHSEG_MOVETO_REL)
                        return SVGPathSeg.PATHSEG_LINETO_REL;
                    return previousCommand;
                }
                return SVGPathSeg.PATHSEG_UNKNOWN;
            }

            Source.prototype.initialCommandIsMoveTo = function() {
                // If the path is empty it is still valid, so return true.
                if (!this.hasMoreData())
                    return true;
                var command = this.peekSegmentType();
                // Path must start with moveTo.
                return command == SVGPathSeg.PATHSEG_MOVETO_ABS || command == SVGPathSeg.PATHSEG_MOVETO_REL;
            }

            Source.prototype._parseNumber = function() {
                var exponent = 0;
                var integer = 0;
                var frac = 1;
                var decimal = 0;
                var sign = 1;
                var expsign = 1;

                var startIndex = this._currentIndex;

                this._skipOptionalSpaces();

                // read the sign
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
                    this._currentIndex++;
                else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
                    this._currentIndex++;
                    sign = -1;
                }

                if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != "."))
                    // The first character of a number must be one of [0-9+-.]
                    return undefined;

                // read the integer part, build right-to-left
                var startIntPartIndex = this._currentIndex;
                while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                    this._currentIndex++; // Advance to first non-digit.

                if (this._currentIndex != startIntPartIndex) {
                    var scanIntPartIndex = this._currentIndex - 1;
                    var multiplier = 1;
                    while (scanIntPartIndex >= startIntPartIndex) {
                        integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                        multiplier *= 10;
                    }
                }

                // Read the decimals.
                if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
                    this._currentIndex++;

                    // There must be a least one digit following the .
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;
                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
                        decimal += (this._string.charAt(this._currentIndex++) - "0") * (frac *= 0.1);
                }

                // read the exponent part
                if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
                    this._currentIndex++;

                    // read the sign of the exponent
                    if (this._string.charAt(this._currentIndex) == "+") {
                        this._currentIndex++;
                    } else if (this._string.charAt(this._currentIndex) == "-") {
                        this._currentIndex++;
                        expsign = -1;
                    }

                    // There must be an exponent
                    if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                        return undefined;

                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                        exponent *= 10;
                        exponent += (this._string.charAt(this._currentIndex) - "0");
                        this._currentIndex++;
                    }
                }

                var number = integer + decimal;
                number *= sign;

                if (exponent)
                    number *= Math.pow(10, expsign * exponent);

                if (startIndex == this._currentIndex)
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();

                return number;
            }

            Source.prototype._parseArcFlag = function() {
                if (this._currentIndex >= this._endIndex)
                    return undefined;
                var flag = false;
                var flagChar = this._string.charAt(this._currentIndex++);
                if (flagChar == "0")
                    flag = false;
                else if (flagChar == "1")
                    flag = true;
                else
                    return undefined;

                this._skipOptionalSpacesOrDelimiter();
                return flag;
            }

            Source.prototype.parseSegment = function() {
                var segment = new PathSegmentData();
                var lookahead = this._string[this._currentIndex];
                var command = this._parseSVGSegmentTypeHelper(lookahead);
                if (command == SVGPathSeg.PATHSEG_UNKNOWN) {
                    // Possibly an implicit command. Not allowed if this is the first command.
                    if (this._previousCommand == SVGPathSeg.PATHSEG_UNKNOWN)
                        return segment;
                    command = this._nextCommandHelper(lookahead, this._previousCommand);
                    if (command == SVGPathSeg.PATHSEG_UNKNOWN)
                        return segment;
                } else {
                    this._currentIndex++;
                }

                this._previousCommand = command;
                segment.command = command;

                switch (segment.command) {
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    segment.point1X = this._parseNumber();
                    segment.point1Y = this._parseNumber();
                    /* fall through */
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                    segment.point2X = this._parseNumber();
                    segment.point2Y = this._parseNumber();
                    /* fall through */
                case SVGPathSeg.PATHSEG_MOVETO_REL:
                case SVGPathSeg.PATHSEG_MOVETO_ABS:
                case SVGPathSeg.PATHSEG_LINETO_REL:
                case SVGPathSeg.PATHSEG_LINETO_ABS:
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                    segment.targetPointX = this._parseNumber();
                    segment.targetPointY = this._parseNumber();
                    break;
                case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    segment.targetPointX = this._parseNumber();
                    break;
                case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    segment.targetPointY = this._parseNumber();
                    break;
                case SVGPathSeg.PATHSEG_CLOSEPATH:
                    this._skipOptionalSpaces();
                    break;
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                    segment.point1X = this._parseNumber();
                    segment.point1Y = this._parseNumber();
                    segment.targetPointX = this._parseNumber();
                    segment.targetPointY = this._parseNumber();
                    break;
                case SVGPathSeg.PATHSEG_ARC_REL:
                case SVGPathSeg.PATHSEG_ARC_ABS:
                    segment.setArcRadiiX(this._parseNumber());
                    segment.setArcRadiiY(this._parseNumber());
                    segment.setArcAngle(this._parseNumber());
                    segment.arcLarge = this._parseArcFlag();
                    segment.arcSweep = this._parseArcFlag();
                    segment.targetPointX = this._parseNumber();
                    segment.targetPointY = this._parseNumber();
                    break;
                case SVGPathSeg.PATHSEG_UNKNOWN:
                    break;
                }

                return segment;
            }

            var builder = new Builder();
            var source = new Source(string);

            if (!source.initialCommandIsMoveTo())
                return [];
            while (source.hasMoreData()) {
                var segment = source.parseSegment();
                if (segment.command == SVGPathSeg.PATHSEG_UNKNOWN)
                    return [];
                builder.appendSegment(segment);
            }

            return builder.path;
        }

        // Add the pathSegList accessors to SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
        Object.defineProperty(SVGPathElement.prototype, "pathSegList", { get: function() { return new SVGPathSegList(this); } });
        // FIXME: The following are not implemented and simply return SVGPathElement.pathSegList.
        Object.defineProperty(SVGPathElement.prototype, "normalizedPathSegList", { get: function() { return new SVGPathSegList(this); } });
        Object.defineProperty(SVGPathElement.prototype, "animatedPathSegList", { get: function() { return new SVGPathSegList(this); } });
        Object.defineProperty(SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function() { return new SVGPathSegList(this); } });
    }
}());