import {
    type IContainerPlugin,
    type IRgb,
    getDistance,
    getLinkColor,
    getRandom,
    getRangeValue,
    rangeColorToRgb,
} from "tsparticles-engine";
import type { ILink, IParticlesFrequencies, ITwinkle } from "./Interfaces";
import type { LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types";
import { drawLinkLine, drawLinkTriangle, setLinkFrequency } from "./Utils";

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

        if (!links || links.length <= 0) {
            return;
        }

        const p1Links = links.filter(
            (l) => options.links && this._getLinkFrequency(particle, l.destination) <= options.links.frequency
        );

        for (const link of p1Links) {
            this._drawTriangles(options, particle, link, p1Links);

            if (link.opacity > 0 && (particle.retina.linksWidth ?? 0) > 0) {
                this._drawLinkLine(particle, link);
            }
        }
    }

    async init(): Promise<void> {
        this._freqs.links = new Map<string, number>();
        this._freqs.triangles = new Map<string, number>();
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

    private _drawLinkLine(p1: LinkParticle, link: ILink): void {
        const container = this.container,
            options = container.actualOptions,
            p2 = link.destination,
            pos1 = p1.getPosition(),
            pos2 = p2.getPosition();

        let opacity = link.opacity;

        container.canvas.draw((ctx) => {
            if (!p1.options.links) {
                return;
            }

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

            const p1LinksOptions = p1.options.links;

            if (!colorLine) {
                const linkColor =
                    p1LinksOptions?.id !== undefined
                        ? container.particles.linksColors.get(p1LinksOptions.id)
                        : container.particles.linksColor;

                colorLine = getLinkColor(p1, p2, linkColor);
            }

            if (!colorLine) {
                return;
            }

            const width = p1.retina.linksWidth ?? 0,
                maxDistance = p1.retina.linksDistance ?? 0,
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
    }

    private _drawLinkTriangle(p1: LinkParticle, link1: ILink, link2: ILink): void {
        if (!p1.options.links) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            p2 = link1.destination,
            p3 = link2.destination,
            triangleOptions = p1.options.links.triangles,
            opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;

        if (opacityTriangle <= 0) {
            return;
        }

        container.canvas.draw((ctx) => {
            const pos1 = p1.getPosition(),
                pos2 = p2.getPosition(),
                pos3 = p3.getPosition(),
                linksDistance = p1.retina.linksDistance ?? 0;

            if (
                getDistance(pos1, pos2) > linksDistance ||
                getDistance(pos3, pos2) > linksDistance ||
                getDistance(pos3, pos1) > linksDistance
            ) {
                return;
            }

            let colorTriangle = rangeColorToRgb(triangleOptions.color);

            if (!colorTriangle) {
                const linksOptions = p1.options.links,
                    linkColor =
                        linksOptions?.id !== undefined
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
    }

    private _drawTriangles(options: ParticlesLinkOptions, p1: LinkParticle, link: ILink, p1Links: ILink[]): void {
        const p2 = link.destination;

        if (!(options.links?.triangles.enable && p2.options.links?.triangles.enable)) {
            return;
        }

        const vertices = p2.links?.filter((t) => {
            const linkFreq = this._getLinkFrequency(p2, t.destination);

            return (
                p2.options.links &&
                linkFreq <= p2.options.links.frequency &&
                p1Links.findIndex((l) => l.destination === t.destination) >= 0
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
    }

    private _getLinkFrequency(p1: LinkParticle, p2: LinkParticle): number {
        return setLinkFrequency([p1, p2], this._freqs.links);
    }

    private _getTriangleFrequency(p1: LinkParticle, p2: LinkParticle, p3: LinkParticle): number {
        return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    }
}
