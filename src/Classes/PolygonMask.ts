"use strict";

import {Container} from "./Container";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Particle} from "./Particle";
import {PolygonMaskInlineArrangement} from "../Enums/PolygonMaskInlineArrangement";

type SvgAbsoluteCoordinatesTypes =
    | SVGPathSegArcAbs
    | SVGPathSegCurvetoCubicAbs
    | SVGPathSegCurvetoCubicSmoothAbs
    | SVGPathSegCurvetoQuadraticAbs
    | SVGPathSegCurvetoQuadraticSmoothAbs
    | SVGPathSegLinetoAbs
    | SVGPathSegMovetoAbs;

type SvgRelativeCoordinatesTypes =
    | SVGPathSegArcRel
    | SVGPathSegCurvetoCubicRel
    | SVGPathSegCurvetoCubicSmoothRel
    | SVGPathSegCurvetoQuadraticRel
    | SVGPathSegCurvetoQuadraticSmoothRel
    | SVGPathSegLinetoRel
    | SVGPathSegMovetoRel;

/**
 * Polygon Mask manager
 */
export class PolygonMask {
    public redrawTimeout?: number;
    public raw?: ICoordinates[];
    public svg?: SVGSVGElement;
    public path?: SVGPathElement;

    private readonly container: Container;
    private width: number;
    private height: number;
    private offset?: ICoordinates;

    constructor(container: Container) {
        this.container = container;
        this.width = 0;
        this.height = 0;
    }

    public checkInsidePolygon(position: ICoordinates | undefined | null): boolean {
        const container = this.container;
        const options = container.options;

        if (options.polygon.type === PolygonMaskType.none) {
            return true;
        }

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (options.polygon.type !== PolygonMaskType.inline) {
            if (!this.raw) {
                this.raw = [];
            }

            if (this.raw.length > 0) {
                const x = position ? position.x : Math.random() * container.canvas.dimension.width;
                const y = position ? position.y : Math.random() * container.canvas.dimension.height;
                let inside = false;

                for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                    const xi = this.raw[i].x;
                    const yi = this.raw[i].y;
                    const xj = this.raw[j].x;
                    const yj = this.raw[j].y;
                    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

                    if (intersect) {
                        inside = !inside;
                    }
                }

                if (options.polygon.type === PolygonMaskType.inside) {
                    return inside;
                } else if (options.polygon.type === PolygonMaskType.outside) {
                    return !inside;
                }
            } else {
                console.error('No polygon found, you need to specify SVG url in config.');
                return true;
            }
        } else {
            return true;
        }

        return false;
    }

    public randomPointInPolygon(): ICoordinates {
        const container = this.container;
        const options = container.options;

        let position: ICoordinates;

        if (options.polygon.type == PolygonMaskType.inline) {
            switch (options.polygon.inlineArrangement) {
                case PolygonMaskInlineArrangement.randomPoint:
                    position = this.getRandomPointOnPolygonPath();
                    break;
                case PolygonMaskInlineArrangement.randomLength:
                    position = this.getRandomPointOnPolygonPathByLength();
                    break;
                case PolygonMaskInlineArrangement.equidistant:
                    position = this.getEquidistantPointOnPolygonPathByIndex(
                        container.particles.array.length
                    );
                    break;
                case PolygonMaskInlineArrangement.onePerPoint:
                default:
                    position = this.getPoingOnPolygonPathByIndex(
                        container.particles.array.length
                    );
            }
        } else {
            position = {
                x: Math.random() * container.canvas.dimension.width,
                y: Math.random() * container.canvas.dimension.height,
            };
        }

        if (this.checkInsidePolygon(position)) {
            return position;
        } else {
            return this.randomPointInPolygon();
        }
    }

    /**
     * Depends on SVGPathSeg API polyfill https://github.com/progers/pathseg for Chrome
     * Deprecate SVGPathElement.getPathSegAtLength removed in:
     * Chrome for desktop release 62
     * Chrome for Android release 62
     * Android WebView release 62
     * Opera release 49
     * Opera for Android release 49
     */
    public async parseSvgPathToPolygon(svgUrl?: string): Promise<ICoordinates[] | undefined> {
        const container = this.container;
        const options = container.options;
        const url = svgUrl || options.polygon.url;

        // Load SVG from file on server
        if (!this.path || !this.svg) {
            const req = await fetch(url);
            if (req.ok) {
                const xml = await req.text();

                const parser = new DOMParser();

                const doc = parser.parseFromString(xml, "image/svg+xml");

                this.svg = doc.getElementsByTagName("svg")[0];
                this.path = doc.getElementsByTagName("path")[0];
            } else {
                console.error("tsParticles Error - during polygon mask download");
                return;
            }
        }

        const scale = options.polygon.scale;

        this.width = parseFloat(this.svg.getAttribute("width") || "0") * scale;
        this.height = parseFloat(this.svg.getAttribute("height") || "0") * scale;

        /* centering of the polygon mask */
        this.offset = {
            x: container.canvas.dimension.width / 2 - this.width / 2,
            y: container.canvas.dimension.height / 2 - this.height / 2,
        };

        const len = this.path.pathSegList.numberOfItems;
        const polygonRaw: ICoordinates[] = [];
        const p = {
            x: 0,
            y: 0,
        };

        for (let i = 0; i < len; i++) {
            const segment: SVGPathSeg = this.path.pathSegList.getItem(i);

            switch (segment.pathSegType) {
                //
                // Absolute
                //
                case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case window.SVGPathSeg.PATHSEG_ARC_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                    const absSeg = segment as SvgAbsoluteCoordinatesTypes;

                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = (segment as SVGPathSegLinetoHorizontalAbs).x;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = (segment as SVGPathSegLinetoVerticalAbs).y;
                    break;

                //
                // Relative
                //
                case window.SVGPathSeg.PATHSEG_LINETO_REL:
                case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case window.SVGPathSeg.PATHSEG_ARC_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                    const relSeg = segment as SvgRelativeCoordinatesTypes;

                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += (segment as SVGPathSegLinetoHorizontalRel).x;
                    break;
                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += (segment as SVGPathSegLinetoVerticalRel).y;
                    break;

                case window.SVGPathSeg.PATHSEG_UNKNOWN:
                case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                    continue; // Skip the closing path (and the UNKNOWN)
            }

            polygonRaw.push({
                x: p.x * scale + this.offset.x,
                y: p.y * scale + this.offset.y
            });
        }

        return polygonRaw;
    }

    public drawPolygon(): void {
        const container = this.container;
        const options = container.options;
        const context = container.canvas.context;

        if (context && this.raw) {
            context.beginPath();
            context.moveTo(this.raw[0].x, this.raw[0].y);

            for (let i = 1; i < this.raw.length; i++) {
                context.lineTo(this.raw[i].x, this.raw[i].y);
            }

            context.closePath();
            context.strokeStyle = options.polygon.draw.lineColor;
            context.lineWidth = options.polygon.draw.lineWidth;
            context.stroke();
        }
    }

    public drawPointsOnPolygonPath(): void {
        const container = this.container;

        if (this.raw) {
            for (const item of this.raw) {
                const position = {
                    x: item.x,
                    y: item.y,
                };
                const particle = new Particle(container, position);

                container.particles.array.push(particle);
            }
        }
    }

    private getRandomPointOnPolygonPath(): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(`No polygon data loaded.`);

        const coords = this.raw[Math.floor(Math.random() * this.raw.length)];

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private getRandomPointOnPolygonPathByLength(): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.path) throw new Error(`No polygon data loaded.`);

        const distance = Math.floor(Math.random() * this.path.getTotalLength()) + 1;
        const point = this.path.getPointAtLength(distance);

        return {
            x: point.x * options.polygon.scale + (this.offset?.x || 0),
            y: point.y * options.polygon.scale + (this.offset?.y || 0),
        };
    }

    private getEquidistantPointOnPolygonPathByIndex(index: number): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.path) throw new Error(`No polygon data loaded.`);

        const distance = (this.path.getTotalLength() / options.particles.number.value) * index;
        const point = this.path.getPointAtLength(distance);

        return {
            x: point.x * options.polygon.scale + (this.offset?.x || 0),
            y: point.y * options.polygon.scale + (this.offset?.y || 0),
        };
    }

    private getPoingOnPolygonPathByIndex(index: number): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(`No polygon data loaded.`);

        const coords = this.raw[index % this.raw.length];

        return {
            x: coords.x,
            y: coords.y,
        };
    }
}
