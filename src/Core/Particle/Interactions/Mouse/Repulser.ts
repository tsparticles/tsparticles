import type { Container } from "../../../Container";
import { ClickMode, DivMode, HoverMode, OutMode } from "../../../../Enums";
import { Circle, Constants, Utils } from "../../../../Utils";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import type { IParticle } from "../../../Interfaces/IParticle";

/**
 * Particle repulse manager
 */
export class Repulser {
    public static repulse(container: Container, _delta: number): void {
        const options = container.options;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;
        const divMode = events.onDiv.mode;
        const divEnabled = events.onDiv.enable;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse(container);
        } else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse(container);
        } else if (divEnabled && Utils.isInArray(DivMode.repulse, divMode)) {
            this.divRepulse(container);
        }
    }

    private static divRepulse(container: Container): void {
        const options = container.options;
        const elem = document.getElementById(options.interactivity.events.onDiv.elementId);

        if (!elem) {
            return;
        }

        const pxRatio = container.retina.pixelRatio;
        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
        };
        const repulseRadius = (elem.offsetWidth / 2) * pxRatio;

        this.processRepulse(container, pos, repulseRadius);
    }

    private static hoverRepulse(container: Container): void {
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const repulseRadius = container.retina.repulseModeDistance;

        this.processRepulse(container, mousePos, repulseRadius);
    }

    private static processRepulse(container: Container, position: ICoordinates, repulseRadius: number): void {
        //const query = container.particles.spatialGrid.queryRadius(position, repulseRadius);
        const query = container.particles.quadTree.query(new Circle(position.x, position.y, repulseRadius));

        for (const particle of query) {
            const { dx, dy, distance } = Utils.getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };

            const velocity = container.options.interactivity.modes.repulse.speed * 100;
            const repulseFactor = Utils.clamp((1 - Math.pow(distance / repulseRadius, 2)) * velocity, 0, 50);
            const outMode = particle.particlesOptions.move.outMode;
            const sizeValue = particle.size.value;
            const pos = {
                x: particle.position.x + normVec.x * repulseFactor,
                y: particle.position.y + normVec.y * repulseFactor,
            };

            if (
                outMode === OutMode.bounce ||
                outMode === OutMode.bounceVertical ||
                outMode === OutMode.bounceHorizontal
            ) {
                const isInside = {
                    horizontal: pos.x - sizeValue > 0 && pos.x + sizeValue < container.canvas.size.width,
                    vertical: pos.y - sizeValue > 0 && pos.y + sizeValue < container.canvas.size.height,
                };

                if (outMode === OutMode.bounceVertical || isInside.horizontal) {
                    particle.position.x = pos.x;
                }

                if (outMode === OutMode.bounceHorizontal || isInside.vertical) {
                    particle.position.y = pos.y;
                }
            } else {
                particle.position.x = pos.x;
                particle.position.y = pos.y;
            }
        }
    }

    private static clickRepulse(container: Container): void {
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }

            container.repulse.count++;

            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }

        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance;
            const repulseRadius = Math.pow(repulseDistance / 6, 3);
            const mouseClickPos = container.interactivity.mouse.clickPosition;

            if (mouseClickPos === undefined) {
                return;
            }

            //const query = container.particles.spatialGrid.queryRadius(mouseClickPos, repulseRadius);
            const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius);
            const query = container.particles.quadTree.query(range);

            for (const particle of query) {
                const { dx, dy, distance } = Utils.getDistances(mouseClickPos, particle.position);
                const d = distance * distance;
                const velocity = container.options.interactivity.modes.repulse.speed;
                const force = (-repulseRadius * velocity) / d;

                // default
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    this.processClickRepulse(container, particle, dx, dy, force);
                }
                // bang - slow motion mode
                // if(!container.repulse_finish){
                //   if(d <= repulseRadius){
                //     process();
                //   }
                // }else{
                //   process();
                // }
            }
        } else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.horizontal = particle.initialVelocity.horizontal;
                particle.velocity.vertical = particle.initialVelocity.vertical;
            }
            container.repulse.particles = [];
        }
    }

    private static processClickRepulse(
        container: Container,
        particle: IParticle,
        dx: number,
        dy: number,
        force: number
    ): void {
        const options = container.options;
        const f = Math.atan2(dy, dx);

        particle.velocity.horizontal = force * Math.cos(f);
        particle.velocity.vertical = force * Math.sin(f);

        const outMode = options.particles.move.outMode;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal || outMode === OutMode.bounceVertical) {
            const pos = {
                x: particle.position.x + particle.velocity.horizontal,
                y: particle.position.y + particle.velocity.vertical,
            };

            if (outMode !== OutMode.bounceVertical) {
                if (pos.x + particle.size.value > container.canvas.size.width || pos.x - particle.size.value < 0) {
                    particle.velocity.horizontal *= -1;
                }
            }

            if (outMode !== OutMode.bounceHorizontal) {
                if (pos.y + particle.size.value > container.canvas.size.height || pos.y - particle.size.value < 0) {
                    particle.velocity.vertical *= -1;
                }
            }
        }
    }
}
