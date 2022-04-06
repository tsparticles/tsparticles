import type { Container, IContainerPlugin, IRgb, Particle } from "tsparticles-engine";
import { colorToRgb, getDistance, getLinkColor, getRangeValue } from "tsparticles-engine";
import { drawLinkLine, drawLinkTriangle } from "./Utils";
import type { ILink } from "./ILink";
import type { LinkParticle } from "./LinkParticle";

export class LinkInstance implements IContainerPlugin {
    constructor(private readonly container: Container) {}

    particleCreated(particle: Particle): void {
        const linkParticle = particle as unknown as LinkParticle;

        linkParticle.links = [];
    }

    particleDestroyed(particle: Particle): void {
        const linkParticle = particle as unknown as LinkParticle;

        linkParticle.links = [];
    }

    drawParticle(context: CanvasRenderingContext2D, particle: Particle): void {
        const linkParticle = particle as unknown as LinkParticle,
            container = this.container,
            particles = container.particles,
            pOptions = particle.options;

        if (linkParticle.links.length <= 0) {
            return;
        }

        context.save();

        const p1Links = linkParticle.links.filter((l) => {
            const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);

            return linkFreq <= pOptions.links.frequency;
        });

        for (const link of p1Links) {
            const p2 = link.destination;

            if (pOptions.links.triangles.enable) {
                const links = p1Links.map((l) => l.destination),
                    vertices = p2.links.filter((t) => {
                        const linkFreq = container.particles.getLinkFrequency(p2, t.destination);

                        return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                    });

                if (vertices.length) {
                    for (const vertex of vertices) {
                        const p3 = vertex.destination,
                            triangleFreq = particles.getTriangleFrequency(linkParticle, p2, p3);

                        if (triangleFreq > pOptions.links.triangles.frequency) {
                            continue;
                        }

                        this.drawLinkTriangle(linkParticle, link, vertex);
                    }
                }
            }

            if (link.opacity > 0 && container.retina.linksWidth > 0) {
                this.drawLinkLine(linkParticle, link);
            }
        }

        context.restore();
    }

    private drawLinkTriangle(p1: LinkParticle, link1: ILink, link2: ILink): void {
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
            const pos1 = p1.getPosition();
            const pos2 = p2.getPosition();
            const pos3 = p3.getPosition();

            if (
                getDistance(pos1, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos1) > container.retina.linksDistance
            ) {
                return;
            }

            let colorTriangle = colorToRgb(triangleOptions.color);

            if (!colorTriangle) {
                const linksOptions = p1.options.links,
                    linkColor =
                        linksOptions.id !== undefined
                            ? container.particles.linksColors.get(linksOptions.id)
                            : container.particles.linksColor;

                colorTriangle = getLinkColor(p1, p2, linkColor);
            }

            if (!colorTriangle) {
                return;
            }

            drawLinkTriangle(
                ctx,
                pos1,
                pos2,
                pos3,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                colorTriangle,
                opacityTriangle
            );
        });
    }

    private drawLinkLine(p1: LinkParticle, link: ILink): void {
        const container = this.container,
            options = container.actualOptions,
            p2 = link.destination,
            pos1 = p1.getPosition(),
            pos2 = p2.getPosition();

        let opacity = link.opacity;

        container.canvas.draw((ctx) => {
            let colorLine: IRgb | undefined;

            /*
             * particles connecting line color:
             *
             *  random: in blink mode : in every frame refresh the color would change
             *          hence resulting blinking of lines
             *  mid: in consent mode: sample particles color and get a mid level color
             *                        from those two for the connecting line color
             */

            const twinkle = p1.options.twinkle.lines;

            if (twinkle.enable) {
                const twinkleFreq = twinkle.frequency,
                    twinkleRgb = colorToRgb(twinkle.color),
                    twinkling = Math.random() < twinkleFreq;

                if (twinkling && twinkleRgb) {
                    colorLine = twinkleRgb;
                    opacity = getRangeValue(twinkle.opacity);
                }
            }

            if (!colorLine) {
                const linksOptions = p1.options.links,
                    linkColor =
                        linksOptions.id !== undefined
                            ? container.particles.linksColors.get(linksOptions.id)
                            : container.particles.linksColor;

                colorLine = getLinkColor(p1, p2, linkColor);
            }

            if (!colorLine) {
                return;
            }

            const width = p1.retina.linksWidth ?? container.retina.linksWidth,
                maxDistance = p1.retina.linksDistance ?? container.retina.linksDistance;

            drawLinkLine(
                ctx,
                width,
                pos1,
                pos2,
                maxDistance,
                container.canvas.size,
                p1.options.links.warp,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                colorLine,
                opacity,
                p1.options.links.shadow
            );
        });
    }
}
