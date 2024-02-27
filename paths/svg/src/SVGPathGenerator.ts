import {
    type Container,
    type ICoordinates,
    type ICoordinatesWithMode,
    type IDelta,
    type IDimension,
    type IMovePathGenerator,
    type Particle,
    PixelMode,
    Vector,
    getPosition,
    getRandom,
    halfRandom,
    randomInRange,
} from "@tsparticles/engine";

const enum SVGPathDirection {
    normal,
    reverse,
}

const defaultSpeed = 1,
    half = 0.5,
    minStep = 0,
    minIndex = 0,
    minWidth = 0,
    minScale = 1;

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
        this._offset = { x: 0, y: 0, mode: PixelMode.percent };
        this._width = 0;
    }

    generate(particle: SVGPathParticle, delta: IDelta): Vector {
        const container = particle.container,
            pxRatio = container.retina.pixelRatio;

        if (particle.svgDirection === undefined) {
            particle.svgDirection = getRandom() > halfRandom ? SVGPathDirection.normal : SVGPathDirection.reverse;
        }

        if (particle.svgPathIndex === undefined) {
            particle.svgPathIndex = Math.floor(Math.random() * this._paths.length);
        }

        if (particle.svgSpeed === undefined) {
            particle.svgSpeed = particle.velocity.mult((particle.retina.moveSpeed ?? defaultSpeed) * half).length;
        }

        if (particle.svgStep === undefined) {
            particle.svgStep = randomInRange({ min: 0, max: this._paths[particle.svgPathIndex].length }) * pxRatio;
        }

        if (particle.svgOffset === undefined) {
            particle.svgOffset = {
                width: randomInRange({ min: -this._width * half, max: this._width * half }) * pxRatio,
                height: randomInRange({ min: -this._width * half, max: this._width * half }) * pxRatio,
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
            const pathLength = path.length,
                indexOffset = 1;

            if (particle.svgStep >= pathLength) {
                particle.svgPathIndex = particle.svgPathIndex + indexOffset;

                if (particle.svgPathIndex >= this._paths.length) {
                    if (this._reverse) {
                        particle.svgPathIndex = this._paths.length - indexOffset;

                        particle.svgDirection = SVGPathDirection.reverse;
                    } else {
                        particle.svgPathIndex = 0;

                        particle.svgStep = 0;
                    }
                }
            } else if (particle.svgStep <= minStep) {
                particle.svgPathIndex = particle.svgPathIndex - indexOffset;

                if (particle.svgPathIndex < minIndex) {
                    if (this._reverse) {
                        particle.svgPathIndex = 0;

                        particle.svgDirection = SVGPathDirection.normal;
                    } else {
                        particle.svgPathIndex = this._paths.length - indexOffset;

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
                canvasSize = particle.container.canvas.size,
                offset = getPosition(this._offset, canvasSize),
                scale = this._scale * pxRatio;

            particle.position.x =
                (pos.x - this._size.width * half) * scale +
                particle.svgInitialPosition.x +
                offset.x +
                particle.svgOffset.width;
            particle.position.y =
                (pos.y - this._size.height * half) * scale +
                particle.svgInitialPosition.y +
                offset.y +
                particle.svgOffset.height;
        }

        return Vector.origin;
    }

    init(container: Container): void {
        const options = container.actualOptions.particles.move.path.options as SVGPathOptions,
            position = options.position ?? this._offset;

        this._reverse = options.reverse ?? this._reverse;
        this._scale = options.scale ?? minScale;
        this._offset.x = position.x;
        this._offset.y = position.y;
        this._offset.mode = position.mode;
        this._width = options.width ?? minWidth;

        if (options.url && !options.path) {
            const url = options.url;

            void (async (): Promise<void> => {
                const response = await fetch(url),
                    data = await response.text();

                // retrieve the svg path from the url
                const parser = new DOMParser(),
                    doc = parser.parseFromString(data, "image/svg+xml"),
                    firstIndex = 0,
                    svg = doc.getElementsByTagName("svg")[firstIndex];

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
