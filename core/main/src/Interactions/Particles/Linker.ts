import type { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import { Circle, CircleWarp, ColorUtils, Constants, NumberUtils } from "../../Utils";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import type { IParticle } from "../../Core/Interfaces/IParticle";

export class Linker implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: IParticle): boolean {
        return particle.particlesOptions.links.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: Particle): void {
        const container = this.container;
        const linkOpt1 = p1.particlesOptions.links;
        const optOpacity = linkOpt1.opacity;
        const optDistance = p1.linksDistance ?? container.retina.linksDistance;
        const canvasSize = container.canvas.size;
        const warp = linkOpt1.warp;
        const pos1 = p1.getPosition();

        //const query = container.particles.spatialGrid.queryRadiusWithDistance(pos1, optDistance + 10);
        const range = warp
            ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new Circle(pos1.x, pos1.y, optDistance);

        const query = container.particles.quadTree.query(range);
        const p1Links = container.particles.getLinks(p1);

        for (const link of p1Links) {
            const index = link.edges.findIndex((t) => t != p1 && (query as IParticle[]).includes(t));

            container.particles.removeLinkAtIndex(index);
        }

        //for (const { distance, p2 } of query) {
        for (const p2 of query) {
            if (p2.id <= p1.id) {
                continue;
            }

            const linkOpt2 = p2.particlesOptions.links;
            const index = container.particles.findLinkIndex(p1, p2);

            if (!linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.destroyed || p2.spawning) {
                if (!linkOpt2.enable || p2.destroyed || p2.spawning) {
                    container.particles.removeLinks(p2);
                }

                container.particles.removeLinkAtIndex(index);

                continue;
            }

            const pos2 = p2.getPosition();

            let distance = NumberUtils.getDistance(pos1, pos2);

            if (warp) {
                if (distance > optDistance) {
                    const pos2NE = {
                        x: pos2.x - canvasSize.width,
                        y: pos2.y,
                    };

                    distance = NumberUtils.getDistance(pos1, pos2NE);

                    if (distance > optDistance) {
                        const pos2SE = {
                            x: pos2.x - canvasSize.width,
                            y: pos2.y - canvasSize.height,
                        };

                        distance = NumberUtils.getDistance(pos1, pos2SE);

                        if (distance > optDistance) {
                            const pos2SW = {
                                x: pos2.x,
                                y: pos2.y - canvasSize.height,
                            };

                            distance = NumberUtils.getDistance(pos1, pos2SW);
                        }
                    }
                }
            }

            /* draw a line between p1 and p2 */
            const opacityLine = optOpacity - (distance * optOpacity) / optDistance;

            if (opacityLine <= 0) {
                if (index >= 0) {
                    container.particles.removeLinkAtIndex(index);
                }
            } else {
                if (index >= 0) {
                    container.particles.links[index].opacity = opacityLine;
                } else {
                    /* style */
                    const linksOptions = p1.particlesOptions.links;

                    let linkColor =
                        linksOptions.id !== undefined
                            ? container.particles.linksColors.get(linksOptions.id)
                            : container.particles.linksColor;

                    if (!linkColor) {
                        const optColor = linksOptions.color;
                        const color = typeof optColor === "string" ? optColor : optColor.value;

                        /* particles.line_linked - convert hex colors to rgb */
                        //  check for the color profile requested and
                        //  then return appropriate value

                        if (color === Constants.randomColorValue) {
                            if (linksOptions.consent) {
                                linkColor = ColorUtils.colorToRgb({
                                    value: color,
                                });
                            } else if (linksOptions.blink) {
                                linkColor = Constants.randomColorValue;
                            } else {
                                linkColor = Constants.midColorValue;
                            }
                        } else {
                            linkColor = ColorUtils.colorToRgb({
                                value: color,
                            });
                        }

                        if (linksOptions.id !== undefined) {
                            container.particles.linksColors.set(linksOptions.id, linkColor);
                        } else {
                            container.particles.linksColor = linkColor;
                        }
                    }

                    const link = container.particles.addLink(p1, p2);

                    link.opacity = opacityLine;
                    link.visible = Math.random() > 1 - linksOptions.frequency;
                }
            }
        }
    }
}
