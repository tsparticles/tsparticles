import { ClickMode } from "../../../Enums/Modes/ClickMode";
import type { Container } from "../../Container";
import { HoverMode } from "../../../Enums/Modes/HoverMode";
import { OutMode } from "../../../Enums/OutMode";
import { Utils } from "../../Utils/Utils";
import { DivMode } from "../../../Enums/Modes/DivMode";
import { Constants } from "../../Utils/Constants";
import { ICoordinates } from "../../../Interfaces/ICoordinates";
import { IParticle } from "../../../Interfaces/IParticle";

/**
 * Particle repulse manager
 */
export class Repulser {
    public static repulse(container: Container): void {
        const options = container.options;
        const interactivity = options.interactivity;
        const hoverEnabled = interactivity.events.onHover.enable;
        const clickEnabled = interactivity.events.onClick.enable;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const hoverMode = interactivity.events.onHover.mode;
        const clickMode = interactivity.events.onClick.mode;
        const divMode = interactivity.events.onDiv.mode;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse(container);
        } else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse(container);
        } else if (interactivity.events.onDiv.enable && Utils.isInArray(DivMode.repulse, divMode)) {
            this.divRepulse(container);
        }
    }

    private static divRepulse(container: Container): void {
        const options = container.options;
        const elem = document.getElementById(options.interactivity.events.onDiv.elementId);

        if (!elem) {
            return;
        }

        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2),
            y: (elem.offsetTop + elem.offsetHeight / 2),
        };

        let divWidth = elem.offsetWidth / 2;

        if (container.retina.isRetina) {
            pos.x *= container.retina.pixelRatio;
            pos.y *= container.retina.pixelRatio;
            divWidth *= container.retina.pixelRatio
        }

        const repulseRadius = divWidth;

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
        for (const particle of container.particles.spatialGrid.queryRadius(position, repulseRadius)) {
            const dx = particle.position.x - position.x;
            const dy = particle.position.y - position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const normVec = {
                x: dx / dist,
                y: dy / dist,
            };

            const velocity = container.options.interactivity.modes.repulse.speed * 100;
            const repulseFactor = Utils.clamp((1 - Math.pow(dist / repulseRadius, 2)) * velocity, 0, 50);
            const outMode = particle.particlesOptions.move.outMode;
            const sizeValue = particle.size.value;
            const pos = {
                x: particle.position.x + normVec.x * repulseFactor,
                y: particle.position.y + normVec.y * repulseFactor,
            };

            if (outMode === OutMode.bounce ||
                outMode === OutMode.bounceVertical ||
                outMode === OutMode.bounceHorizontal) {
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

            for (const particle of container.particles.spatialGrid.queryRadius(mouseClickPos, repulseRadius)) {
                if (particle?.position === undefined) {
                    continue;
                }

                const dx = mouseClickPos.x - particle.position.x;
                const dy = mouseClickPos.y - particle.position.y;
                const d = dx * dx + dy * dy;
                const velocity = container.options.interactivity.modes.repulse.speed;
                const force = -repulseRadius * velocity / d;

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

    private static processClickRepulse(container: Container,
                                       particle: IParticle,
                                       dx: number,
                                       dy: number,
                                       force: number): void {
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
                if (pos.x + particle.size.value > container.canvas.size.width ||
                    pos.x - particle.size.value < 0) {
                    particle.velocity.horizontal = -particle.velocity.horizontal;
                }
            }

            if (outMode !== OutMode.bounceHorizontal) {
                if (pos.y + particle.size.value > container.canvas.size.height ||
                    pos.y - particle.size.value < 0) {
                    particle.velocity.vertical = -particle.velocity.vertical;
                }
            }
        }
    }
}
