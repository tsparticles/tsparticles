import { Container } from "../../Core/Container";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import { Particle } from "../../Core/Particle";
import { PolygonMaskInlineArrangement } from "../../Enums/PolygonMaskInlineArrangement";
import { Utils } from "../../Utils/Utils";
import type { IDimension } from "../../Core/Interfaces/IDimension";
import { Constants } from "../../Utils/Constants";
import type { ISvgPath } from "../../Core/Interfaces/ISvgPath";
import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import type { IPolygonMaskDrawStroke } from "../../Options/Interfaces/PolygonMask/IPolygonMaskDrawStroke";
import { ColorUtils } from "../../Utils/ColorUtils";

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
export class PolygonMask implements IContainerPlugin {
    public redrawTimeout?: number;
    public raw?: ICoordinates[];
    public svg?: SVGSVGElement;
    public paths: ISvgPath[];
    public dimension: IDimension;
    public offset?: ICoordinates;
    public readonly path2DSupported: boolean;

    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.paths = [];
        this.path2DSupported = window.hasOwnProperty("Path2D");
    }

    private static polygonBounce(particle: Particle): void {
        particle.velocity.horizontal = -particle.velocity.horizontal + (particle.velocity.vertical / 2);
        particle.velocity.vertical = -particle.velocity.vertical + (particle.velocity.horizontal / 2);
    }

    private static drawPolygonMask(context: CanvasRenderingContext2D,
                                   rawData: ICoordinates[],
                                   stroke: IPolygonMaskDrawStroke): void {
        const color = typeof stroke.color === "string" ?
            ColorUtils.stringToRgb(stroke.color) :
            ColorUtils.colorToRgb(stroke.color);

        if (color) {
            context.beginPath();
            context.moveTo(rawData[0].x, rawData[0].y);

            for (let i = 1; i < rawData.length; i++) {
                context.lineTo(rawData[i].x, rawData[i].y);
            }

            context.closePath();
            context.strokeStyle = ColorUtils.getStyleFromColor(color);
            context.lineWidth = stroke.width;
            context.stroke();
        }
    }

    private static drawPolygonMaskPath(context: CanvasRenderingContext2D,
                                       path: Path2D,
                                       stroke: IPolygonMaskDrawStroke,
                                       position: ICoordinates): void {
        context.translate(position.x, position.y);

        const color = typeof stroke.color === "string" ?
            ColorUtils.stringToRgb(stroke.color) :
            ColorUtils.colorToRgb(stroke.color);

        if (color) {
            context.strokeStyle = ColorUtils.getStyleFromColor(color, stroke.opacity);
            context.lineWidth = stroke.width;
            context.stroke(path);
        }
    }

    public checkInsidePolygon(position: ICoordinates | undefined): boolean {
        const container = this.container;
        const options = container.options;

        if (!options.polygon.enable ||
            options.polygon.type === PolygonMaskType.none ||
            options.polygon.type === PolygonMaskType.inline) {
            return true;
        }

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (!this.raw) {
            throw new Error(Constants.noPolygonFound);
        }

        const x = position ? position.x : Math.random() * container.canvas.size.width;
        const y = position ? position.y : Math.random() * container.canvas.size.height;
        let inside = false;

        // if (this.path2DSupported && this.polygonPath && position) {
        //     inside = container.canvas.isPointInPath(this.polygonPath, position);
        // } else {
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
        // }

        if (options.polygon.type === PolygonMaskType.inside) {
            return inside;
        } else if (options.polygon.type === PolygonMaskType.outside) {
            return !inside;
        }

        return false;
    }

    public resize(): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none) {
            if (this.redrawTimeout) {
                clearTimeout(this.redrawTimeout);
            }

            this.redrawTimeout = window.setTimeout(() => {
                this.parseSvgPathToPolygon().then((data) => {
                    this.raw = data;

                    this.createPath2D();

                    container.particles.redraw();
                });
            }, 250);
        }
    }

    public async startAsync(): Promise<void> {
        const container = this.container;
        const options = container.options;

        /* If is set the url of svg element, load it and parse into raw polygon data,
         * works only with single path SVG
         */
        if (options.polygon.enable && options.polygon.url) {
            this.raw = await this.parseSvgPathToPolygon(options.polygon.url);

            this.createPath2D();
        }
    }

    public stop(): void {
        delete this.raw;
        this.paths = [];
        delete this.svg;
    }

    public randomPointInPolygon(): ICoordinates {
        const container = this.container;
        const options = container.options;

        let position: ICoordinates;

        if (options.polygon.type === PolygonMaskType.inline) {
            switch (options.polygon.inline.arrangement) {
                case PolygonMaskInlineArrangement.randomPoint:
                    position = this.getRandomPointOnPolygonPath();
                    break;
                case PolygonMaskInlineArrangement.randomLength:
                    position = this.getRandomPointOnPolygonPathByLength();
                    break;
                case PolygonMaskInlineArrangement.equidistant:
                    position = this.getEquidistantPointOnPolygonPathByIndex(container.particles.count);
                    break;
                case PolygonMaskInlineArrangement.onePerPoint:
                case PolygonMaskInlineArrangement.perPoint:
                default:
                    position = this.getPointOnPolygonPathByIndex(container.particles.count);
            }
        } else {
            position = {
                x: Math.random() * container.canvas.size.width,
                y: Math.random() * container.canvas.size.height,
            };
        }

        if (this.checkInsidePolygon(position)) {
            return position;
        } else {
            return this.randomPointInPolygon();
        }
    }

    public particlesInitialization(): boolean {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline &&
            (options.polygon.inline.arrangement === PolygonMaskInlineArrangement.onePerPoint ||
                options.polygon.inline.arrangement === PolygonMaskInlineArrangement.perPoint)) {
            this.drawPointsOnPolygonPath();

            return true;
        }

        return false;
    }

    public particlePosition(position?: ICoordinates): ICoordinates | undefined {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && (this.raw?.length ?? 0) > 0) {
            const pos = { x: 0, y: 0 };

            if (position) {
                pos.x = position.x;
                pos.y = position.y;
            } else {
                const randomPoint = this.randomPointInPolygon();

                pos.x = randomPoint.x;
                pos.y = randomPoint.y;
            }

            return pos;
        }
    }

    public particleBounce(particle: Particle, _delta: number): boolean {
        const container = this.container;
        const options = container.options;

        /* check bounce against polygon boundaries */
        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
            options.polygon.type !== PolygonMaskType.inline) {
            if (!this.checkInsidePolygon(particle.position)) {
                PolygonMask.polygonBounce(particle);

                return true;
            }
        } else if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
            if (particle.initialPosition) {
                const dist = Utils.getDistance(particle.initialPosition, particle.position);

                if (dist > container.retina.polygonMaskMoveRadius) {
                    PolygonMask.polygonBounce(particle);

                    return true;
                }
            }
        }

        return false;
    }

    public clickPositionValid(position: ICoordinates): boolean {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
            options.polygon.type !== PolygonMaskType.inline) {
            if (this.checkInsidePolygon(position)) {
                return true;
            }
        }

        return false;
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
        if (!this.paths.length || !this.svg) {
            const req = await fetch(url);
            if (req.ok) {
                const xml = await req.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml, "image/svg+xml");

                this.svg = doc.getElementsByTagName("svg")[0];
                const svgPaths = doc.getElementsByTagName("path");

                for (let i = 0; i < svgPaths.length; i++) {
                    const path = svgPaths.item(i);

                    if (path) {
                        this.paths.push({
                            element: path,
                            length: path.getTotalLength(),
                        });
                    }
                }
            } else {
                throw new Error("tsParticles Error - Error occurred during polygon mask download");
            }
        }

        const pxRatio = container.retina.pixelRatio;
        const scale = options.polygon.scale / pxRatio;

        this.dimension.width = parseFloat(this.svg.getAttribute("width") || "0") * scale;
        this.dimension.height = parseFloat(this.svg.getAttribute("height") || "0") * scale;

        const position = options.polygon.position ?? {
            x: 50,
            y: 50,
        };

        /* centering of the polygon mask */
        this.offset = {
            x: container.canvas.size.width * position.x / (100 * pxRatio) - this.dimension.width / 2,
            y: container.canvas.size.height * position.y / (100 * pxRatio) - this.dimension.height / 2,
        };

        const polygonRaw: ICoordinates[] = [];

        for (const path of this.paths) {
            const len = path.element.pathSegList.numberOfItems;
            const p = {
                x: 0,
                y: 0,
            };

            for (let i = 0; i < len; i++) {
                const segment: SVGPathSeg = path.element.pathSegList.getItem(i);

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
                    y: p.y * scale + this.offset.y,
                });
            }
        }

        return polygonRaw;
    }

    public draw(context: CanvasRenderingContext2D): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.enable && options.polygon.draw.enable) {
            const container = this.container;
            const options = container.options;
            const polygonDraw = options.polygon.draw;
            const rawData = this.raw;

            for (const path of this.paths) {
                const path2d = path.path2d;
                const path2dSupported = this.path2DSupported;

                if (context) {
                    if (path2dSupported && path2d && this.offset) {
                        PolygonMask.drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
                    } else if (rawData) {
                        PolygonMask.drawPolygonMask(context, rawData, polygonDraw.stroke);
                    }
                }
            }
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

                container.particles.addParticle(new Particle(container, position));
            }
        }
    }

    private getRandomPointOnPolygonPath(): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(Constants.noPolygonDataLoaded);

        const coords = Utils.itemFromArray(this.raw);

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private getRandomPointOnPolygonPathByLength(): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.paths.length) throw new Error(Constants.noPolygonDataLoaded);

        const path = Utils.itemFromArray(this.paths);
        const distance = Math.floor(Math.random() * path.length) + 1;
        const point = path.element.getPointAtLength(distance);

        return {
            x: point.x * options.polygon.scale + (this.offset?.x || 0),
            y: point.y * options.polygon.scale + (this.offset?.y || 0),
        };
    }

    private getEquidistantPointOnPolygonPathByIndex(index: number): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.paths.length) throw new Error(Constants.noPolygonDataLoaded);

        let offset = 0;
        let point: DOMPoint | undefined;

        const totalLength = this.paths.reduce((tot: number, path: ISvgPath) => tot + path.length, 0);
        const distance = totalLength / options.particles.number.value;

        for (const path of this.paths) {
            const pathDistance = distance * index - offset;

            if (pathDistance <= path.length) {
                point = path.element.getPointAtLength(pathDistance);

                break;
            } else {
                offset += path.length;
            }
        }

        return {
            x: (point?.x ?? 0) * options.polygon.scale + (this.offset?.x ?? 0),
            y: (point?.y ?? 0) * options.polygon.scale + (this.offset?.y ?? 0),
        };
    }

    private getPointOnPolygonPathByIndex(index: number): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(Constants.noPolygonDataLoaded);

        const coords = this.raw[index % this.raw.length];

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private createPath2D(): void {
        if (!this.path2DSupported) {
            return;
        }

        for (const path of this.paths) {
            const pathData = path.element?.getAttribute("d");

            if (pathData) {
                const path2d = new Path2D(pathData);
                const matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix()

                const finalPath = new Path2D();

                const transform = matrix.scale(this.container.options.polygon.scale);

                if (finalPath.addPath) {
                    finalPath.addPath(path2d, transform);

                    path.path2d = finalPath;
                } else {
                    delete path.path2d;
                }
            } else {
                delete path.path2d;
            }

            if (!path.path2d && this.raw) {
                path.path2d = new Path2D();

                path.path2d.moveTo(this.raw[0].x, this.raw[0].y);

                this.raw.forEach((pos, i) => {
                    if (i > 0) {
                        path.path2d?.lineTo(pos.x, pos.y);
                    }
                });

                path.path2d.closePath();
            }
        }
    }
}
