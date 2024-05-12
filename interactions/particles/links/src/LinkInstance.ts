import {
    type IContainerPlugin,
    type IRgb,
    getDistance,
    getLinkColor,
    getRandom,
    getRangeValue,
    rangeColorToRgb,
} from "@tsparticles/engine";
import type { ILink, IParticlesFrequencies, ITwinkle } from "./Interfaces.js";
import type { LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
import { drawLinkLine, drawLinkTriangle, setLinkFrequency } from "./Utils.js";

const minOpacity = 0,
    minWidth = 0,
    minDistance = 0,
    half = 0.5,
    maxFrequency = 1;

export class LinkInstance implements IContainerPlugin {
    private readonly _freqs: IParticlesFrequencies;

    constructor(private readonly container: LinkContainer) {
        this._freqs = {
            links: new Map<string, number>(),
            triangles: new Map<string, number>(),
        };
    }

    drawParticle(context: CanvasRenderingContext2D, particle: LinkParticle): void {
        const { links, options } = particle;

        if (!links?.length) {
            return;
        }

        const p1Links = links.filter(
            l =>
                options.links &&
                (options.links.frequency >= maxFrequency ||
                    this._getLinkFrequency(particle, l.destination) <= options.links.frequency),
        );

        for (const link of p1Links) {
            this._drawTriangles(options, particle, link, p1Links);

            if (link.opacity > minOpacity && (particle.retina.linksWidth ?? minWidth) > minWidth) {
                this._drawLinkLine(particle, link);
            }
        }
    }

    async init(): Promise<void> {
        this._freqs.links = new Map<string, number>();
        this._freqs.triangles = new Map<string, number>();

        await Promise.resolve();
    }

    particleCreated(particle: LinkParticle): void {
        particle.links = [];

        if (!particle.options.links) {
            return;
        }

        const ratio = this.container.retina.pixelRatio,
            { retina } = particle,
            { distance, width } = particle.options.links;

        retina.linksDistance = distance * ratio;
        retina.linksWidth = width * ratio;
    }

    particleDestroyed(particle: LinkParticle): void {
        particle.links = [];
    }

    private readonly _drawLinkLine: (p1: LinkParticle, link: ILink) => void = (p1, link) => {
        const p1LinksOptions = p1.options.links;

        if (!p1LinksOptions?.enable) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            p2 = link.destination,
            pos1 = p1.getPosition(),
            pos2 = p2.getPosition();

        let opacity = link.opacity;

        container.canvas.draw(ctx => {
            let colorLine: IRgb | undefined;

            /*
             * particles connecting line color:
             *
             *  random: in blink mode : in every frame refresh the color would change
             *          hence resulting blinking of lines
             *  mid: in consent mode: sample particles color and get a mid level color
             *                        from those two for the connecting line color
             */
            const twinkle = (p1.options.twinkle as ITwinkle)?.lines;

            if (twinkle?.enable) {
                const twinkleFreq = twinkle.frequency,
                    twinkleRgb = rangeColorToRgb(twinkle.color),
                    twinkling = getRandom() < twinkleFreq;

                if (twinkling && twinkleRgb) {
                    colorLine = twinkleRgb;
                    opacity = getRangeValue(twinkle.opacity);
                }
            }

            if (!colorLine) {
                const linkColor =
                    p1LinksOptions.id !== undefined
                        ? container.particles.linksColors.get(p1LinksOptions.id)
                        : container.particles.linksColor;

                colorLine = getLinkColor(p1, p2, linkColor);
            }

            if (!colorLine) {
                return;
            }

            const width = p1.retina.linksWidth ?? minWidth,
                maxDistance = p1.retina.linksDistance ?? minDistance,
                { backgroundMask } = options;

            drawLinkLine({
                context: ctx,
                width,
                begin: pos1,
                end: pos2,
                maxDistance,
                canvasSize: container.canvas.size,
                links: p1LinksOptions,
                backgroundMask: backgroundMask,
                colorLine,
                opacity,
            });
        });
    };

    private readonly _drawLinkTriangle: (p1: LinkParticle, link1: ILink, link2: ILink) => void = (p1, link1, link2) => {
        const linksOptions = p1.options.links;

        if (!linksOptions?.enable) {
            return;
        }

        const triangleOptions = linksOptions.triangles;

        if (!triangleOptions.enable) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            p2 = link1.destination,
            p3 = link2.destination,
            opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) * half;

        if (opacityTriangle <= minOpacity) {
            return;
        }

        container.canvas.draw(ctx => {
            const pos1 = p1.getPosition(),
                pos2 = p2.getPosition(),
                pos3 = p3.getPosition(),
                linksDistance = p1.retina.linksDistance ?? minDistance;

            if (
                getDistance(pos1, pos2) > linksDistance ||
                getDistance(pos3, pos2) > linksDistance ||
                getDistance(pos3, pos1) > linksDistance
            ) {
                return;
            }

            let colorTriangle = rangeColorToRgb(triangleOptions.color);

            if (!colorTriangle) {
                const linkColor =
                    linksOptions.id !== undefined
                        ? container.particles.linksColors.get(linksOptions.id)
                        : container.particles.linksColor;

                colorTriangle = getLinkColor(p1, p2, linkColor);
            }

            if (!colorTriangle) {
                return;
            }

            drawLinkTriangle({
                context: ctx,
                pos1,
                pos2,
                pos3,
                backgroundMask: options.backgroundMask,
                colorTriangle,
                opacityTriangle,
            });
        });
    };

    private readonly _drawTriangles: (
        options: ParticlesLinkOptions,
        p1: LinkParticle,
        link: ILink,
        p1Links: ILink[],
    ) => void = (options, p1, link, p1Links) => {
        const p2 = link.destination;

        if (!(options.links?.triangles.enable && p2.options.links?.triangles.enable)) {
            return;
        }

        const vertices = p2.links?.filter(t => {
            const linkFreq = this._getLinkFrequency(p2, t.destination),
                minCount = 0;

            return (
                p2.options.links &&
                linkFreq <= p2.options.links.frequency &&
                p1Links.findIndex(l => l.destination === t.destination) >= minCount
            );
        });

        if (!vertices?.length) {
            return;
        }

        for (const vertex of vertices) {
            const p3 = vertex.destination,
                triangleFreq = this._getTriangleFrequency(p1, p2, p3);

            if (triangleFreq > options.links.triangles.frequency) {
                continue;
            }

            this._drawLinkTriangle(p1, link, vertex);
        }
    };

    private readonly _getLinkFrequency: (p1: LinkParticle, p2: LinkParticle) => number = (p1, p2) => {
        return setLinkFrequency([p1, p2], this._freqs.links);
    };

    private readonly _getTriangleFrequency: (p1: LinkParticle, p2: LinkParticle, p3: LinkParticle) => number = (
        p1,
        p2,
        p3,
    ) => {
        return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
}
