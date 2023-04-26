import {
    type Container,
    type ICoordinates,
    type ICoordinatesWithMode,
    type IDelta,
    type IDimension,
    type IMovePathGenerator,
    type Particle,
    SizeMode,
    Vector,
    getRandom,
    randomInRange,
} from "tsparticles-engine";

declare global {
    interface Window {
        [key: string]: unknown;
    }
}

const enum SVGPathDirection {
    normal,
    reverse,
}

type SVGPathParticle = Particle & {
    svgDirection?: SVGPathDirection;
    svgInitialPosition?: ICoordinates;
    svgOffset?: IDimension;
    svgPathIndex?: number;
    svgSpeed?: number;
    svgStep?: number;
};

interface SVGPathOptions {
    path?: {
        data: string[];
        size: IDimension;
    };
    position?: ICoordinatesWithMode;
    reverse?: boolean;
    scale?: number;
    url?: string;
    width?: number;
}

interface SVGPathData {
    element: SVGPathElement;
    length: number;
}

export class SVGPathGenerator implements IMovePathGenerator {
    private readonly _offset: ICoordinatesWithMode;
    private _paths: SVGPathData[];
    private _reverse: boolean;
    private _scale: number;
    private readonly _size: IDimension;
    private _width: number;

    constructor() {
        this._paths = [];
        this._reverse = false;
        this._size = { width: 0, height: 0 };
        this._scale = 1;
        this._offset = { x: 0, y: 0, mode: SizeMode.percent };
        this._width = 0;
    }

    generate(particle: SVGPathParticle, delta: IDelta): Vector {
        const container = particle.container,
            pxRatio = container.retina.pixelRatio;

        if (particle.svgDirection === undefined) {
            particle.svgDirection = getRandom() > 0.5 ? SVGPathDirection.normal : SVGPathDirection.reverse;
        }

        if (particle.svgPathIndex === undefined) {
            particle.svgPathIndex = Math.floor(Math.random() * this._paths.length);
        }

        if (particle.svgSpeed === undefined) {
            particle.svgSpeed = particle.velocity.mult((particle.retina.moveSpeed ?? 1) / 2).length;
        }

        if (particle.svgStep === undefined) {
            particle.svgStep = randomInRange({ min: 0, max: this._paths[particle.svgPathIndex].length }) * pxRatio;
        }

        if (particle.svgOffset === undefined) {
            particle.svgOffset = {
                width: randomInRange({ min: -this._width / 2, max: this._width / 2 }) * pxRatio,
                height: randomInRange({ min: -this._width / 2, max: this._width / 2 }) * pxRatio,
            };
        }

        if (particle.svgInitialPosition === undefined) {
            particle.svgInitialPosition = { ...particle.position };
        }

        particle.velocity.x = 0;
        particle.velocity.y = 0;

        if (particle.svgDirection === SVGPathDirection.normal) {
            particle.svgStep += particle.svgSpeed * delta.factor;
        } else {
            particle.svgStep -= particle.svgSpeed * delta.factor;
        }

        let path = this._paths[particle.svgPathIndex];

        if (path) {
            const pathLength = path.length;

            if (particle.svgStep >= pathLength) {
                particle.svgPathIndex = particle.svgPathIndex + 1;

                if (particle.svgPathIndex >= this._paths.length) {
                    if (this._reverse) {
                        particle.svgPathIndex = this._paths.length - 1;

                        particle.svgDirection = SVGPathDirection.reverse;
                    } else {
                        particle.svgPathIndex = 0;

                        particle.svgStep = 0;
                    }
                }
            } else if (particle.svgStep <= 0) {
                particle.svgPathIndex = particle.svgPathIndex - 1;

                if (particle.svgPathIndex < 0) {
                    if (this._reverse) {
                        particle.svgPathIndex = 0;

                        particle.svgDirection = SVGPathDirection.normal;
                    } else {
                        particle.svgPathIndex = this._paths.length - 1;

                        path = this._paths[particle.svgPathIndex];

                        particle.svgStep = path.length;
                    }
                }
            }

            path = this._paths[particle.svgPathIndex];
        }

        if (path) {
            const pathElement = path.element,
                pos = pathElement.getPointAtLength(particle.svgStep),
                offset = this._offset,
                canvasSize = particle.container.canvas.size,
                isPercent = offset.mode === SizeMode.percent,
                scale = this._scale * pxRatio;

            particle.position.x =
                (pos.x - this._size.width / 2) * scale +
                particle.svgInitialPosition.x +
                (isPercent ? (canvasSize.width * offset.x) / 100 : offset.x) +
                particle.svgOffset.width;
            particle.position.y =
                (pos.y - this._size.height / 2) * scale +
                particle.svgInitialPosition.y +
                (isPercent ? (canvasSize.height * offset.y) / 100 : offset.y) +
                particle.svgOffset.height;
        }

        return Vector.origin;
    }

    init(container: Container): void {
        const options = container.actualOptions.particles.move.path.options as SVGPathOptions,
            position = options.position ?? this._offset;

        this._reverse = options.reverse ?? this._reverse;
        this._scale = options.scale ?? 1;
        this._offset.x = position.x;
        this._offset.y = position.y;
        this._offset.mode = position.mode;
        this._width = options.width ?? 0;

        if (options.url && !options.path) {
            const url = options.url;

            (async (): Promise<void> => {
                const response = await fetch(url),
                    data = await response.text();

                // retrieve the svg path from the url
                const parser = new DOMParser(),
                    doc = parser.parseFromString(data, "image/svg+xml"),
                    svg = doc.getElementsByTagName("svg")[0];

                let svgPaths = svg.getElementsByTagName("path");

                if (!svgPaths.length) {
                    svgPaths = doc.getElementsByTagName("path");
                }

                this._paths = [];

                for (let i = 0; i < svgPaths.length; i++) {
                    const path = svgPaths.item(i);

                    if (path) {
                        this._paths.push({
                            element: path,
                            length: path.getTotalLength(),
                        });
                    }
                }

                this._size.height = parseFloat(svg.getAttribute("height") ?? "0");
                this._size.width = parseFloat(svg.getAttribute("width") ?? "0");
            })();
        } else if (options.path) {
            const path = options.path;

            this._paths = [];

            for (const item of path.data) {
                const element = document.createElementNS("http://www.w3.org/2000/svg", "path");

                element.setAttribute("d", item);

                this._paths.push({
                    element,
                    length: element.getTotalLength(),
                });
            }

            this._size.height = path.size.height;
            this._size.width = path.size.width;
        }
    }

    reset(): void {
        // do nothing
    }

    update(): void {
        // do nothing
    }
}
