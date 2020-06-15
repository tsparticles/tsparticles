import type { Container } from "../../../Container";
import { Constants, Utils, Circle, ColorUtils } from "../../../../Utils";
import { IRgb } from "../../../Interfaces/IRgb";
import { IColor } from "../../../Interfaces/IColor";
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
                            container.particles.grabLineColor =
                                optColor === Constants.randomColorValue ||
                                (optColor as IColor)?.value === Constants.randomColorValue
                                    ? Constants.randomColorValue
                                    : ColorUtils.colorToRgb(optColor);
                        }

                        let colorLine: IRgb;

                        if (container.particles.grabLineColor === Constants.randomColorValue) {
                            colorLine = ColorUtils.getRandomRgbColor();
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
