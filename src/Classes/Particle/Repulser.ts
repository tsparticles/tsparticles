"use strict";

import { ClickMode } from "../../Enums/ClickMode";
import { Container } from "../Container";
import { HoverMode } from "../../Enums/HoverMode";
import { OutMode } from "../../Enums/OutMode";
import { Particle } from "../Particle";
import { Utils } from "../Utils/Utils";

export class Repulser {
    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public repulse(): void {
        const container = this.container;
        const options = container.options;
        const hoverEnabled = options.interactivity.events.onhover.enable;
        const clickEnabled = options.interactivity.events.onclick.enable;
        const mouseMoveStatus = container.interactivity.status === "mousemove";
        const hoverMode = options.interactivity.events.onhover.mode;
        const clickMode = options.interactivity.events.onclick.mode;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        } else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        }
    }

    private clickRepulse(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }

            container.repulse.count++;

            if (container.repulse.count === container.particles.array.length) {
                container.repulse.finish = true;
            }
        }

        if (container.repulse.clicking) {
            const repulseDistance = options.interactivity.modes.repulse.distance;
            const repulseRadius = Math.pow(repulseDistance / 6, 3);
            const mouseClickPos = container.interactivity.mouse.clickPosition || { x: 0, y: 0 };
            const dx = mouseClickPos.x - particle.position.x;
            const dy = mouseClickPos.y - particle.position.y;
            const d = dx * dx + dy * dy;
            const force = -repulseRadius / d;

            // default
            if (d <= repulseRadius) {
                this.processRepulse(dx, dy, force);
            }
            // bang - slow motion mode
            // if(!container.repulse_finish){
            //   if(d <= repulseRadius){
            //     process();
            //   }
            // }else{
            //   process();
            // }
        } else if (container.repulse.clicking === false) {
            particle.velocity.horizontal = particle.initialVelocity.horizontal;
            particle.velocity.vertical = particle.initialVelocity.vertical;
        }
    }

    private hoverRepulse(): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
        const dx_mouse = particle.position.x - mousePos.x;
        const dy_mouse = particle.position.y - mousePos.y;
        const dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        const normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse };
        const repulseRadius = options.interactivity.modes.repulse.distance, velocity = 100;
        const repulseFactor = Utils.clamp((1 - Math.pow(dist_mouse / repulseRadius, 2)) * velocity, 0, 50);
        const pos = {
            x: particle.position.x + normVec.x * repulseFactor,
            y: particle.position.y + normVec.y * repulseFactor,
        };
        const outMode = options.particles.move.out_mode;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            if (pos.x - particle.radius > 0 && pos.x + particle.radius < container.canvas.w) {
                particle.position.x = pos.x;
            }

            if (pos.y - particle.radius > 0 && pos.y + particle.radius < container.canvas.h) {
                particle.position.y = pos.y;
            }
        } else {
            particle.position.x = pos.x;
            particle.position.y = pos.y;
        }
    }

    private processRepulse(dx: number, dy: number, force: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const f = Math.atan2(dy, dx);

        particle.velocity.horizontal = force * Math.cos(f);
        particle.velocity.vertical = force * Math.sin(f);

        const outMode = options.particles.move.out_mode;

        if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
            const pos = {
                x: particle.position.x + particle.velocity.horizontal,
                y: particle.position.y + particle.velocity.vertical,
            };

            if (pos.x + particle.radius > container.canvas.w) {
                particle.velocity.horizontal = -particle.velocity.horizontal;
            } else if (pos.x - particle.radius < 0) {
                particle.velocity.horizontal = -particle.velocity.horizontal;
            }

            if (pos.y + particle.radius > container.canvas.h) {
                particle.velocity.vertical = -particle.velocity.vertical;
            } else if (pos.y - particle.radius < 0) {
                particle.velocity.vertical = -particle.velocity.vertical;
            }
        }
    }
}
