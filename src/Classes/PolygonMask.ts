"use strict";

import {Container} from "./Container";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Particle} from "./Particle";

export class PolygonMask {
    public redrawTimeout?: number;
    public raw?: number[][];
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

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (options.polygon.type !== PolygonMaskType.inline) {
            if (!this.raw) {
                this.raw = [];
            }

            if (this.raw.length > 0) {
                const x = position ? position.x : Math.random() * container.canvas.width;
                const y = position ? position.y : Math.random() * container.canvas.height;
                let inside = false;

                for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                    const xi = this.raw[i][0], yi = this.raw[i][1];
                    const xj = this.raw[j][0], yj = this.raw[j][1];
                    const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

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
        const position = {
            x: Math.random() * container.canvas.width,
            y: Math.random() * container.canvas.height,
        };

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
    public async parseSvgPathToPolygon(svgUrl?: string): Promise<number[][] | undefined> {
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

        this.width = parseFloat(this.svg.getAttribute("width") || "0");
        this.height = parseFloat(this.svg.getAttribute("height") || "0");

        /* centering of the polygon mask */
        this.offset = {
            x: container.canvas.width / 2 - this.width / 2,
            y: container.canvas.height / 2 - this.height / 2,
        };

        const len = this.path.pathSegList.numberOfItems;
        const polygonRaw = [];
        const p = {
            x: 0,
            y: 0,
        };

        for (let i = 0; i < len; i++) {
            const segment: any = this.path.pathSegList.getItem(i);

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
                    p.x = segment.x;
                    p.y = segment.y;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = segment.x;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = segment.y;
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
                    p.x += segment.x;
                    p.y += segment.y;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += segment.x;
                    break;
                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += segment.y;
                    break;

                case window.SVGPathSeg.PATHSEG_UNKNOWN:
                case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                    continue; // Skip the closing path (and the UNKNOWN)
                    break;
            }

            polygonRaw.push([p.x + this.offset.x, p.y + this.offset.y]);
        }

        return polygonRaw;
    }

    public drawDebugPolygon(): void {
        const container = this.container;
        const options = container.options;
        const context = container.canvas.context;

        if (context && this.raw) {
            context.beginPath();
            context.moveTo(this.raw[0][0], this.raw[0][1]);

            for (let i = 1; i < this.raw.length; i++) {
                context.lineTo(this.raw[i][0], this.raw[i][1]);
            }

            context.closePath();
            context.strokeStyle = options.polygon.debug.color;
            context.lineWidth = 0.5;
            context.stroke();
        }
    }

    public drawPointsOnPolygonPath(): void {
        const container = this.container;

        if (this.raw) {
            for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                const position = {
                    x: this.raw[i][0],
                    y: this.raw[i][1],
                };
                const particle = new Particle(container, position);

                container.particles.array.push(particle);
            }
        }
    }
}
