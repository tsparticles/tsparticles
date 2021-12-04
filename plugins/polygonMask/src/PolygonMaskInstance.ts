import { Container, tsParticles } from "tsparticles-engine";
import type { IContainerPlugin, ICoordinates, IDelta, IDimension } from "tsparticles-engine";
import { InlineArrangement, Type } from "./Enums";
import { Particle } from "tsparticles-engine";
import {
    deepExtend,
    getDistance,
    getDistances,
    itemFromArray,
    noPolygonFound,
    noPolygonDataLoaded,
} from "tsparticles-engine";
import type { ISvgPath } from "./Interfaces/ISvgPath";
import type { RecursivePartial } from "tsparticles-engine";
import { PolygonMask } from "./Options/Classes/PolygonMask";
import { OutModeDirection } from "tsparticles-engine";
import type { IPolygonMaskOptions } from "./types";
import { calcClosestPtOnSegment, drawPolygonMask, drawPolygonMaskPath, parsePaths, segmentBounce } from "./utils";

/**
 * Polygon Mask manager
 * @category Polygon Mask Plugin
 */
export class PolygonMaskInstance implements IContainerPlugin {
    redrawTimeout?: number;
    raw?: ICoordinates[];
    paths?: ISvgPath[];
    dimension: IDimension;
    offset?: ICoordinates;
    readonly path2DSupported;
    readonly options;

    private polygonMaskMoveRadius;

    constructor(private readonly container: Container) {
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask();
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
    }

    async initAsync(options?: RecursivePartial<IPolygonMaskOptions>): Promise<void> {
        this.options.load(options?.polygon);

        const polygonMaskOptions = this.options;

        this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;

        /* If is set the url of svg element, load it and parse into raw polygon data */
        if (polygonMaskOptions.enable) {
            await this.initRawData();
        }
    }

    resize(): void {
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

    stop(): void {
        delete this.raw;
        delete this.paths;
    }

    particlesInitialization(): boolean {
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

    particlePosition(position?: ICoordinates): ICoordinates | undefined {
        const options = this.options;

        if (!(options.enable && (this.raw?.length ?? 0) > 0)) {
            return;
        }

        return deepExtend({}, position ? position : this.randomPoint()) as ICoordinates;
    }

    particleBounce(particle: Particle, delta: IDelta, direction: OutModeDirection): boolean {
        return this.polygonBounce(particle, delta, direction);
    }

    clickPositionValid(position: ICoordinates): boolean {
        const options = this.options;

        return (
            options.enable &&
            options.type !== Type.none &&
            options.type !== Type.inline &&
            this.checkInsidePolygon(position)
        );
    }

    draw(context: CanvasRenderingContext2D): void {
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
                drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
            } else if (rawData) {
                drawPolygonMask(context, rawData, polygonDraw.stroke);
            }
        }
    }

    private polygonBounce(particle: Particle, _delta: IDelta, direction: OutModeDirection): boolean {
        const options = this.options;

        if (!this.raw || !options.enable || direction !== OutModeDirection.top) {
            return false;
        }

        if (options.type === Type.inside || options.type === Type.outside) {
            let closest: ICoordinates | undefined, dx: number | undefined, dy: number | undefined;
            const pos = particle.getPosition(),
                radius = particle.getRadius();

            for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                const pi = this.raw[i],
                    pj = this.raw[j];
                closest = calcClosestPtOnSegment(pi, pj, pos);

                const dist = getDistances(pos, closest);

                [dx, dy] = [dist.dx, dist.dy];

                if (dist.distance < radius) {
                    segmentBounce(pi, pj, particle.velocity);

                    return true;
                }
            }

            if (closest && dx !== undefined && dy !== undefined && !this.checkInsidePolygon(pos)) {
                const factor = { x: 1, y: 1 };

                if (particle.position.x >= closest.x) {
                    factor.x = -1;
                }

                if (particle.position.y >= closest.y) {
                    factor.y = -1;
                }

                particle.position.x = closest.x + radius * 2 * factor.x;
                particle.position.y = closest.y + radius * 2 * factor.y;

                particle.velocity.mult(-1);

                return true;
            }
        } else if (options.type === Type.inline && particle.initialPosition) {
            const dist = getDistance(particle.initialPosition, particle.getPosition());

            if (dist > this.polygonMaskMoveRadius) {
                particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
                particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;

                return true;
            }
        }

        return false;
    }

    private checkInsidePolygon(position?: ICoordinates): boolean {
        const container = this.container;
        const options = this.options;

        if (!options.enable || options.type === Type.none || options.type === Type.inline) {
            return true;
        }

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (!this.raw) {
            throw new Error(noPolygonFound);
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

        return parsePaths(this.paths, scale, this.offset);
    }

    /**
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
            throw new Error(noPolygonDataLoaded);
        }

        const coords = itemFromArray(this.raw);

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private getRandomPointByLength(): ICoordinates {
        const options = this.options;

        if (!this.raw || !this.raw.length || !this.paths?.length) {
            throw new Error(noPolygonDataLoaded);
        }

        const path = itemFromArray(this.paths);
        const distance = Math.floor(Math.random() * path.length) + 1;
        const point = path.element.getPointAtLength(distance);

        return {
            x: point.x * options.scale + (this.offset?.x || 0),
            y: point.y * options.scale + (this.offset?.y || 0),
        };
    }

    private getEquidistantPointByIndex(index: number): ICoordinates {
        const options = this.container.actualOptions;
        const polygonMaskOptions = this.options;

        if (!this.raw || !this.raw.length || !this.paths?.length) throw new Error(noPolygonDataLoaded);

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
            throw new Error(noPolygonDataLoaded);
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

        tsParticles.dispatchEvent("polygonMaskLoaded", {
            container: this.container,
        });
    }
}
