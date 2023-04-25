import {
    type Container,
    type ICoordinatesWithMode,
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

type SVGPathParticle = Particle & {
    svgDirection?: number;
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
    scale?: number;
    url?: string;
}

interface SVGPathData {
    element: SVGPathElement;
    length: number;
}

export class SVGPathGenerator implements IMovePathGenerator {
    private _paths: SVGPathData[];
    private readonly _position: ICoordinatesWithMode;
    private _scale: number;
    private readonly _size: IDimension;

    constructor() {
        this._paths = [];
        this._size = { width: 0, height: 0 };
        this._scale = 1;
        this._position = { x: 50, y: 50, mode: SizeMode.percent };
    }

    generate(p: SVGPathParticle): Vector {
        if (p.svgDirection === undefined) {
            p.svgDirection = getRandom() > 0.5 ? 1 : -1;
        }

        if (p.svgPathIndex === undefined) {
            p.svgPathIndex = Math.floor(Math.random() * this._paths.length);
        }

        if (p.svgSpeed === undefined) {
            p.svgSpeed = p.velocity.length;
        }

        if (p.svgStep === undefined) {
            p.svgStep = randomInRange({ min: 0, max: this._paths[p.svgPathIndex].length });
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        p.svgStep++;

        let path = this._paths[p.svgPathIndex];

        if (path) {
            const pathLength = path.length;

            if (p.svgStep >= pathLength) {
                p.svgStep = 0;
                p.svgPathIndex = (p.svgPathIndex + 1) % this._paths.length;

                path = this._paths[p.svgPathIndex];
            }
        }

        if (path) {
            const pathElement = path.element,
                pos = pathElement.getPointAtLength(p.svgStep),
                offset = this._position,
                canvasSize = p.container.canvas.size,
                isPercent = offset.mode === SizeMode.percent,
                scale = this._scale;

            p.position.x = pos.x * scale + (isPercent ? (canvasSize.width * offset.x) / 100 : offset.x);
            p.position.y = pos.y * scale + (isPercent ? (canvasSize.height * offset.y) / 100 : offset.y);
        }

        return Vector.origin;
    }

    init(container: Container): void {
        const options = container.actualOptions.particles.move.path.options as SVGPathOptions,
            position = options.position ?? this._position;

        this._scale = options.scale ?? 1;
        this._position.x = position.x;
        this._position.y = position.y;
        this._position.mode = position.mode;

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
