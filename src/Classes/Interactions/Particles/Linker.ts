import type { Container } from "../../Container";
import { ColorUtils } from "../../Utils/ColorUtils";
import { Constants } from "../../Utils/Constants";
import { Particle } from "../../Particle";

export class Linker {
    public static link(p1: Particle, container: Container): void {
        const optOpacity = p1.particlesOptions.lineLinked.opacity;
        const optDistance = p1.lineLinkedDistance ?? container.retina.lineLinkedDistance;
        const pos = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };

        for (const p2 of container.particles.spatialGrid.queryRadiusWithDistance(pos, optDistance)) {
            if (p1 === p2.particle || !p2.particle.particlesOptions.lineLinked.enable) {
                continue;
            }

            /* draw a line between p1 and p2 */
            const opacityLine = optOpacity - (p2.distance * optOpacity) / optDistance;

            if (opacityLine > 0) {

                /* style */
                if (!container.particles.lineLinkedColor) {
                    const optColor = p1.particlesOptions.lineLinked.color;
                    const color = typeof optColor === "string" ? optColor : optColor.value;

                    /* particles.line_linked - convert hex colors to rgb */
                    //  check for the color profile requested and
                    //  then return appropriate value

                    if (color === Constants.randomColorValue) {
                        if (p1.particlesOptions.lineLinked.consent) {
                            container.particles.lineLinkedColor = ColorUtils.colorToRgb({ value: color });
                        } else if (p1.particlesOptions.lineLinked.blink) {
                            container.particles.lineLinkedColor = Constants.randomColorValue;
                        } else {
                            container.particles.lineLinkedColor = Constants.midColorValue;
                        }
                    } else {
                        container.particles.lineLinkedColor = ColorUtils.colorToRgb({ value: color });
                    }
                }

                if (p2.particle.links.indexOf(p1) == -1 && p1.links.indexOf(p2.particle) == -1) {
                    p1.links.push(p2.particle);
                    container.canvas.drawLinkedLine(p1, p2.particle, opacityLine);
                }
            }
        }
    }
}
