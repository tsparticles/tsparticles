import type { Container } from "../../../Container";
import { Constants, Utils, Circle, ColorUtils } from "../../../../Utils";
import { IRgb } from "../../../Interfaces/IRgb";
import { HoverMode } from "../../../../Enums/Modes";
import { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";

/**
 * Particle grab manager
 */
export class Grabber implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(): boolean {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.options.interactivity.events;

        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }

        const hoverMode = events.onHover.mode;

        return Utils.isInArray(HoverMode.grab, hoverMode);
    }

    public reset(): void {
        // do nothing
    }

    public interact(): void {
        const container = this.container;
        const options = container.options;
        const interactivity = options.interactivity;

        if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;

            if (mousePos === undefined) {
                return;
            }

            const distance = container.retina.grabModeDistance;
            //const query = container.particles.spatialGrid.queryRadiusWithDistance(mousePos, distance);
            const query = container.particles.quadTree.query(new Circle(mousePos.x, mousePos.y, distance));

            //for (const { distance, particle } of query) {
            for (const particle of query) {
                /*
                   draw a line between the cursor and the particle
                   if the distance between them is under the config distance
                */
                const pos = particle.getPosition();
                const distance = Utils.getDistance(pos, mousePos);

                if (distance <= container.retina.grabModeDistance) {
                    const grabLineOptions = interactivity.modes.grab.links;
                    const lineOpacity = grabLineOptions.opacity;
                    const grabDistance = container.retina.grabModeDistance;
                    const opacityLine = lineOpacity - (distance * lineOpacity) / grabDistance;

                    if (opacityLine > 0) {
                        /* style */
                        const optColor = grabLineOptions.color ?? particle.particlesOptions.links.color;

                        if (!container.particles.grabLineColor) {
                            const linksOptions = container.options.interactivity.modes.grab.links;
                            const color = typeof optColor === "string" ? optColor : optColor.value;

                            /* particles.line_linked - convert hex colors to rgb */
                            //  check for the color profile requested and
                            //  then return appropriate value

                            if (color === Constants.randomColorValue) {
                                if (linksOptions.consent) {
                                    container.particles.grabLineColor = ColorUtils.colorToRgb({
                                        value: color,
                                    });
                                } else if (linksOptions.blink) {
                                    container.particles.grabLineColor = Constants.randomColorValue;
                                } else {
                                    container.particles.grabLineColor = Constants.midColorValue;
                                }
                            } else if (color !== undefined) {
                                container.particles.grabLineColor = ColorUtils.colorToRgb({
                                    value: color,
                                });
                            }
                        }

                        let colorLine: IRgb | undefined;

                        if (container.particles.grabLineColor === Constants.randomColorValue) {
                            colorLine = ColorUtils.getRandomRgbColor();
                        } else if (container.particles.grabLineColor === "mid") {
                            const sourceColor = particle.getFillColor() ?? particle.getStrokeColor();

                            colorLine = sourceColor ? ColorUtils.hslToRgb(sourceColor) : undefined;
                        } else {
                            colorLine = container.particles.grabLineColor as IRgb;
                        }

                        if (colorLine === undefined) {
                            return;
                        }

                        container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                    }
                }
            }
        }
    }
}
