import type { Container } from "../../../Container";
import type { Particle } from "../../../Particle";
import { Circle, CircleWarp, ColorUtils, Constants, Utils } from "../../../../Utils";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";

export class Linker implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(particle: Particle): boolean {
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
            ? new CircleWarp(pos1.x, pos1.y, optDistance + 10, canvasSize)
            : new Circle(pos1.x, pos1.y, optDistance + 10);

        const query = container.particles.quadTree.query(range);

        //for (const { distance, p2 } of query) {
        for (const p2 of query) {
            const linkOpt2 = p2.particlesOptions.links;

            if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.destroyed || p2.spawning) {
                continue;
            }

            const pos2 = p2.getPosition();

            let distance = Utils.getDistance(pos1, pos2);

            if (warp) {
                if (distance > optDistance) {
                    const pos2NE = {
                        x: pos2.x - canvasSize.width,
                        y: pos2.y,
                    };

                    distance = Utils.getDistance(pos1, pos2NE);

                    if (distance > optDistance) {
                        const pos2SE = {
                            x: pos2.x - canvasSize.width,
                            y: pos2.y - canvasSize.height,
                        };

                        distance = Utils.getDistance(pos1, pos2SE);

                        if (distance > optDistance) {
                            const pos2SW = {
                                x: pos2.x,
                                y: pos2.y - canvasSize.height,
                            };

                            distance = Utils.getDistance(pos1, pos2SW);
                        }
                    }
                }
            }

            /* draw a line between p1 and p2 */
            const opacityLine = optOpacity - (distance * optOpacity) / optDistance;

            const index1 = p1.links.map((t) => t.destination).indexOf(p2);
            const index2 = p2.links.map((t) => t.destination).indexOf(p1);

            if (opacityLine <= 0) {
                if (index1 >= 0) {
                    p1.links.splice(index1, 1);
                }

                if (index2 >= 0) {
                    p2.links.splice(index2, 1);
                }
            } else {
                if (index1 >= 0 || index2 >= 0) {
                    if (index1 >= 0) {
                        p1.links[index1].opacity = opacityLine;
                    }

                    if (index2 >= 0) {
                        p2.links[index2].opacity = opacityLine;
                    }

                    continue;
                }

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

                p1.links.push({
                    destination: p2,
                    opacity: opacityLine,
                });
            }
        }
    }
}
