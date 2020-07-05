import { Container } from "../../Core/Container";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { InlineArrangement, Type } from "./Enums";
import { Particle } from "../../Core/Particle";
import { ColorUtils, Constants, Utils } from "../../Utils";
import type { IDimension } from "../../Core/Interfaces/IDimension";
import type { ISvgPath } from "./Interfaces/ISvgPath";
import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import type { IDrawStroke } from "./Options/Interfaces/IDrawStroke";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask";
import { PolygonMask } from "./Options/Classes/PolygonMask";

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

type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};

type PolygonMaskParticle = Particle & {
    initialPosition?: ICoordinates;
};

/**
 * Polygon Mask manager
 */
export class PolygonMaskInstance implements IContainerPlugin {
    public redrawTimeout?: number;
    public raw?: ICoordinates[];
    public paths?: ISvgPath[];
    public dimension: IDimension;
    public offset?: ICoordinates;
    public readonly path2DSupported: boolean;
    public readonly options: PolygonMask;

    private polygonMaskMoveRadius: number;

    constructor(private readonly container: Container) {
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask();
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
    }

    private static polygonBounce(particle: Particle): void {
        particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
        particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
    }

    private static drawPolygonMask(
        context: CanvasRenderingContext2D,
        rawData: ICoordinates[],
        stroke: IDrawStroke
    ): void {
        const color = ColorUtils.colorToRgb(stroke.color);

        if (!color) {
            return;
        }

        context.beginPath();
        context.moveTo(rawData[0].x, rawData[0].y);

        for (const item of rawData) {
            context.lineTo(item.x, item.y);
        }

        context.closePath();
        context.strokeStyle = ColorUtils.getStyleFromRgb(color);
        context.lineWidth = stroke.width;
        context.stroke();
    }

    private static drawPolygonMaskPath(
        context: CanvasRenderingContext2D,
        path: Path2D,
        stroke: IDrawStroke,
        position: ICoordinates
    ): void {
        context.translate(position.x, position.y);

        const color = ColorUtils.colorToRgb(stroke.color);

        if (!color) {
            return;
        }

        context.strokeStyle = ColorUtils.getStyleFromRgb(color, stroke.opacity);
        context.lineWidth = stroke.width;
        context.stroke(path);
    }

    private static parsePaths(paths: ISvgPath[], scale: number, offset: ICoordinates): ICoordinates[] {
        const res: ICoordinates[] = [];

        for (const path of paths) {
            const segments = path.element.pathSegList;
            const len = segments.numberOfItems;
            const p = {
                x: 0,
                y: 0,
            };

            for (let i = 0; i < len; i++) {
                const segment: SVGPathSeg = segments.getItem(i);
                const svgPathSeg = window.SVGPathSeg;

                switch (segment.pathSegType) {
                    //
                    // Absolute
                    //
                    case svgPathSeg.PATHSEG_MOVETO_ABS:
                    case svgPathSeg.PATHSEG_LINETO_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                    case svgPathSeg.PATHSEG_ARC_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                        const absSeg = segment as SvgAbsoluteCoordinatesTypes;

                        p.x = absSeg.x;
                        p.y = absSeg.y;
                        break;
                    }
                    case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                        p.x = (segment as SVGPathSegLinetoHorizontalAbs).x;
                        break;

                    case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                        p.y = (segment as SVGPathSegLinetoVerticalAbs).y;
                        break;

                    //
                    // Relative
                    //
                    case svgPathSeg.PATHSEG_LINETO_REL:
                    case svgPathSeg.PATHSEG_MOVETO_REL:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                    case svgPathSeg.PATHSEG_ARC_REL:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                        const relSeg = segment as SvgRelativeCoordinatesTypes;

                        p.x += relSeg.x;
                        p.y += relSeg.y;
                        break;
                    }
                    case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                        p.x += (segment as SVGPathSegLinetoHorizontalRel).x;
                        break;

                    case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                        p.y += (segment as SVGPathSegLinetoVerticalRel).y;
                        break;

                    case svgPathSeg.PATHSEG_UNKNOWN:
                    case svgPathSeg.PATHSEG_CLOSEPATH:
                        continue; // Skip the closing path (and the UNKNOWN)
                }

                res.push({
                    x: p.x * scale + offset.x,
                    y: p.y * scale + offset.y,
                });
            }
        }

        return res;
    }

    public async initAsync(options?: RecursivePartial<IPolygonMaskOptions>): Promise<void> {
        this.options.load(options?.polygon);

        const polygonMaskOptions = this.options;

        this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;

        /* If is set the url of svg element, load it and parse into raw polygon data */
        if (polygonMaskOptions.enable) {
            await this.initRawData();
        }
    }

    public resize(): void {
        const container = this.container;
        const options = this.options;

        if (!(options.enable && options.type !== Type.none)) {
            return;
        }

        if (this.redrawTimeout) {
            clearTimeout(this.redrawTimeout);
        }

        this.redrawTimeout = window.setTimeout(async () => {
            await this.initRawData(true);

            container.particles.redraw();
        }, 250);
    }

    public stop(): void {
        delete this.raw;
        delete this.paths;
    }

    public particlesInitialization(): boolean {
        const options = this.options;

        if (
            options.enable &&
            options.type === Type.inline &&
            (options.inline.arrangement === InlineArrangement.onePerPoint ||
                options.inline.arrangement === InlineArrangement.perPoint)
        ) {
            this.drawPoints();

            return true;
        }

        return false;
    }

    public particlePosition(position?: ICoordinates, particle?: PolygonMaskParticle): ICoordinates | undefined {
        const options = this.options;

        if (!(options.enable && (this.raw?.length ?? 0) > 0)) {
            return;
        }

        const pos = Utils.deepExtend({}, position ? position : this.randomPoint());

        if (options.type === Type.inline && particle) {
            particle.initialPosition = pos;
        }

        return pos;
    }

    public particleBounce(particle: PolygonMaskParticle): boolean {
        const options = this.options;

        /* check bounce against polygon boundaries */
        if (options.enable && options.type !== Type.none && options.type !== Type.inline) {
            if (!this.checkInsidePolygon(particle.getPosition())) {
                PolygonMaskInstance.polygonBounce(particle);

                return true;
            }
        } else if (options.enable && options.type === Type.inline && particle.initialPosition) {
            const dist = Utils.getDistance(particle.initialPosition, particle.getPosition());

            if (dist > this.polygonMaskMoveRadius) {
                PolygonMaskInstance.polygonBounce(particle);

                return true;
            }
        }

        return false;
    }

    public clickPositionValid(position: ICoordinates): boolean {
        const options = this.options;

        return (
            options.enable &&
            options.type !== Type.none &&
            options.type !== Type.inline &&
            this.checkInsidePolygon(position)
        );
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (!this.paths?.length) {
            return;
        }

        const options = this.options;
        const polygonDraw = options.draw;

        if (!(options.enable && polygonDraw.enable)) {
            return;
        }

        const rawData = this.raw;

        for (const path of this.paths) {
            const path2d = path.path2d;
            const path2dSupported = this.path2DSupported;

            if (!context) {
                continue;
            }

            if (path2dSupported && path2d && this.offset) {
                PolygonMaskInstance.drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
            } else if (rawData) {
                PolygonMaskInstance.drawPolygonMask(context, rawData, polygonDraw.stroke);
            }
        }
    }

    private checkInsidePolygon(position: ICoordinates | undefined): boolean {
        const container = this.container;
        const options = this.options;

        if (!options.enable || options.type === Type.none || options.type === Type.inline) {
            return true;
        }

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (!this.raw) {
            throw new Error(Constants.noPolygonFound);
        }

        const canvasSize = container.canvas.size;
        const x = position?.x ?? Math.random() * canvasSize.width;
        const y = position?.y ?? Math.random() * canvasSize.height;

        let inside = false;

        // if (this.path2DSupported && this.polygonPath && position) {
        //     inside = container.canvas.isPointInPath(this.polygonPath, position);
        // } else {
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
            const pi = this.raw[i];
            const pj = this.raw[j];
            const intersect = pi.y > y !== pj.y > y && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;

            if (intersect) {
                inside = !inside;
            }
        }
        // }

        return options.type === Type.inside ? inside : options.type === Type.outside ? !inside : false;
    }

    private parseSvgPath(xml: string, force?: boolean): ICoordinates[] | undefined {
        const forceDownload = force ?? false;

        if (this.paths !== undefined && !forceDownload) {
            return this.raw;
        }

        const container = this.container;
        const options = this.options;
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "image/svg+xml");
        const svg = doc.getElementsByTagName("svg")[0];

        let svgPaths = svg.getElementsByTagName("path");

        if (!svgPaths.length) {
            svgPaths = doc.getElementsByTagName("path");
        }

        this.paths = [];

        for (let i = 0; i < svgPaths.length; i++) {
            const path = svgPaths.item(i);

            if (path) {
                this.paths.push({
                    element: path,
                    length: path.getTotalLength(),
                });
            }
        }

        const pxRatio = container.retina.pixelRatio;
        const scale = options.scale / pxRatio;

        this.dimension.width = parseFloat(svg.getAttribute("width") ?? "0") * scale;
        this.dimension.height = parseFloat(svg.getAttribute("height") ?? "0") * scale;

        const position = options.position ?? {
            x: 50,
            y: 50,
        };

        /* centering of the polygon mask */
        this.offset = {
            x: (container.canvas.size.width * position.x) / (100 * pxRatio) - this.dimension.width / 2,
            y: (container.canvas.size.height * position.y) / (100 * pxRatio) - this.dimension.height / 2,
        };

        return PolygonMaskInstance.parsePaths(this.paths, scale, this.offset);
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
    private async downloadSvgPath(svgUrl?: string, force?: boolean): Promise<ICoordinates[] | undefined> {
        const options = this.options;
        const url = svgUrl || options.url;
        const forceDownload = force ?? false;

        // Load SVG from file on server
        if (!url || (this.paths !== undefined && !forceDownload)) {
            return this.raw;
        }

        const req = await fetch(url);

        if (!req.ok) {
            throw new Error("tsParticles Error - Error occurred during polygon mask download");
        }

        return this.parseSvgPath(await req.text(), force);
    }

    private drawPoints(): void {
        if (!this.raw) {
            return;
        }

        for (const item of this.raw) {
            this.container.particles.addParticle({
                x: item.x,
                y: item.y,
            });
        }
    }

    private randomPoint(): ICoordinates {
        const container = this.container;
        const options = this.options;

        let position: ICoordinates;

        if (options.type === Type.inline) {
            switch (options.inline.arrangement) {
                case InlineArrangement.randomPoint:
                    position = this.getRandomPoint();
                    break;
                case InlineArrangement.randomLength:
                    position = this.getRandomPointByLength();
                    break;
                case InlineArrangement.equidistant:
                    position = this.getEquidistantPointByIndex(container.particles.count);
                    break;
                case InlineArrangement.onePerPoint:
                case InlineArrangement.perPoint:
                default:
                    position = this.getPointByIndex(container.particles.count);
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
            return this.randomPoint();
        }
    }

    private getRandomPoint(): ICoordinates {
        if (!this.raw || !this.raw.length) {
            throw new Error(Constants.noPolygonDataLoaded);
        }

        const coords = Utils.itemFromArray(this.raw);

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private getRandomPointByLength(): ICoordinates {
        const options = this.options;

        if (!this.raw || !this.raw.length || !this.paths?.length) {
            throw new Error(Constants.noPolygonDataLoaded);
        }

        const path = Utils.itemFromArray(this.paths);
        const distance = Math.floor(Math.random() * path.length) + 1;
        const point = path.element.getPointAtLength(distance);

        return {
            x: point.x * options.scale + (this.offset?.x || 0),
            y: point.y * options.scale + (this.offset?.y || 0),
        };
    }

    private getEquidistantPointByIndex(index: number): ICoordinates {
        const options = this.container.options;
        const polygonMaskOptions = this.options;

        if (!this.raw || !this.raw.length || !this.paths?.length) throw new Error(Constants.noPolygonDataLoaded);

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
            x: (point?.x ?? 0) * polygonMaskOptions.scale + (this.offset?.x ?? 0),
            y: (point?.y ?? 0) * polygonMaskOptions.scale + (this.offset?.y ?? 0),
        };
    }

    private getPointByIndex(index: number): ICoordinates {
        if (!this.raw || !this.raw.length) {
            throw new Error(Constants.noPolygonDataLoaded);
        }

        const coords = this.raw[index % this.raw.length];

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private createPath2D(): void {
        const options = this.options;

        if (!this.path2DSupported || !this.paths?.length) {
            return;
        }

        for (const path of this.paths) {
            const pathData = path.element?.getAttribute("d");

            if (pathData) {
                const path2d = new Path2D(pathData);
                const matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
                const finalPath = new Path2D();
                const transform = matrix.scale(options.scale);

                if (finalPath.addPath) {
                    finalPath.addPath(path2d, transform);

                    path.path2d = finalPath;
                } else {
                    delete path.path2d;
                }
            } else {
                delete path.path2d;
            }

            if (path.path2d || !this.raw) {
                continue;
            }

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

    private async initRawData(force?: boolean): Promise<void> {
        const options = this.options;

        if (options.url) {
            this.raw = await this.downloadSvgPath(options.url, force);
        } else if (options.data) {
            const data = options.data;

            let svg: string;

            if (typeof data !== "string") {
                const path =
                    data.path instanceof Array
                        ? data.path.map((t) => `<path d="${t}" />`).join("")
                        : `<path d="${data.path}" />`;

                const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';

                svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
            } else {
                svg = data;
            }

            this.raw = this.parseSvgPath(svg, force);
        }

        this.createPath2D();
    }
}
