import type { Container } from "../../../Container";
import { ColorUtils } from "../../../../Utils/ColorUtils";
import { Constants } from "../../../../Utils/Constants";
import type { Particle } from "../../../Particle";
import { Utils } from "../../../../Utils/Utils";
import { Circle } from "../../../../Utils/Circle";
import { CircleWarp } from "../../../../Utils/CircleWarp";

export class Linker {
    public static link(p1: Particle, container: Container, _delta: number): void {
        const lineOptions = p1.particlesOptions.lineLinked;
        const optOpacity = lineOptions.opacity;
        const optDistance = p1.lineLinkedDistance ?? container.retina.lineLinkedDistance;
        const canvasSize = container.canvas.size;
        const warp = lineOptions.warp;
        const pos1 = p1.getPosition();

        //const query = container.particles.spatialGrid.queryRadiusWithDistance(pos1, optDistance);
        const range = warp ?
            new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) :
            new Circle(pos1.x, pos1.y, optDistance);

        const query = container.particles.quadTree.query(range);

        //for (const { distance, p2 } of query) {
        for (const p2 of query) {
            if (p1 === p2 || !p2.particlesOptions.lineLinked.enable) {
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

            if (distance > optDistance) {
                return;
            }

            /* draw a line between p1 and p2 */
            const opacityLine = optOpacity - (distance * optOpacity) / optDistance;

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

                if (p2.links.map(t => t.destination).indexOf(p1) == -1 &&
                    p1.links.map(t => t.destination).indexOf(p2) == -1) {
                    p1.links.push({
                        destination: p2,
                        opacity: opacityLine,
                    });
                }
            }
        }
    }
}
