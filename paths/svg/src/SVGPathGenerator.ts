import { type Container, type IMovePathGenerator, type Particle, Vector, getRandom } from "tsparticles-engine";

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
        height: number;
        width: number;
    };
    scale?: number;
    url?: string;
}

interface SVGPathData {
    element: SVGPathElement;
    length: number;
}

export class SVGPathGenerator implements IMovePathGenerator {
    private _height: number;
    private _paths: SVGPathData[];
    private _width: number;

    constructor() {
        this._paths = [];
        this._height = 0;
        this._width = 0;
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
            p.svgStep = 0;
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
                pos = pathElement.getPointAtLength(p.svgStep);

            p.position.x = pos.x;
            p.position.y = pos.y;
        }

        return Vector.origin;
    }

    init(container: Container): void {
        const options = container.actualOptions.particles.move.path.options as SVGPathOptions;

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

                const scale = options.scale ?? 1;

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

                this._height = parseFloat(svg.getAttribute("height") ?? "0") * scale;
                this._width = parseFloat(svg.getAttribute("width") ?? "0") * scale;
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

            this._height = path.height;
            this._width = path.width;
        }
    }

    reset(): void {
        // do nothing
    }

    update(): void {
        // do nothing
    }
}
