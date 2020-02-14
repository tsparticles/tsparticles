import { Particle } from "../../classes/particle";
import { Container } from "../../classes/container";
import { Utils } from "../utils";
import { OutMode, HoverMode, ClickMode } from "../enums";

export class Repulser {
    private readonly particle: Particle;
    private readonly container: Container;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    public repulse() {
        const container = this.container;
        const options = container.options;

        if (options.interactivity.events.onhover.enable && Utils.isInArray(HoverMode.repulse, options.interactivity.events.onhover.mode) && container.interactivity.status === "mousemove") {
            this.hoverRepulse();
        } else if (options.interactivity.events.onclick.enable && Utils.isInArray(ClickMode.repulse, options.interactivity.events.onclick.mode)) {
            this.clickRepulse();
        }
    }

    private clickRepulse() {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        if (!container.repulse.finish) {

            if (!container.repulse.count)
                container.repulse.count = 0;

            container.repulse.count++;

            if (container.repulse.count === container.particles.array.length) {
                container.repulse.finish = true;
            }
        }

        if (container.repulse.clicking) {
            let repulseRadius = Math.pow(options.interactivity.modes.repulse.distance / 6, 3);
            let dx = (container.interactivity.mouse.click_pos_x || 0) - particle.position.x;
            let dy = (container.interactivity.mouse.click_pos_y || 0) - particle.position.y;
            let d = dx * dx + dy * dy;
            let force = -repulseRadius / d;

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

    private hoverRepulse() {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;

        let dx_mouse = particle.position.x - (container.interactivity.mouse.pos_x || 0);
        let dy_mouse = particle.position.y - (container.interactivity.mouse.pos_y || 0);
        let dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        let normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse };
        let repulseRadius = options.interactivity.modes.repulse.distance, velocity = 100;
        let repulseFactor = Utils.clamp((1 / repulseRadius) * (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50);
        let pos = {
            x: particle.position.x + normVec.x * repulseFactor,
            y: particle.position.y + normVec.y * repulseFactor
        };

        if (options.particles.move.out_mode === OutMode.bounce || options.particles.move.out_mode === OutMode.bounceVertical) {
            if (pos.x - particle.radius > 0 && pos.x + particle.radius < container.canvas.w)
                particle.position.x = pos.x;
            if (pos.y - particle.radius > 0 && pos.y + particle.radius < container.canvas.h)
                particle.position.y = pos.y;
        } else {
            particle.position.x = pos.x;
            particle.position.y = pos.y;
        }
    }

    public processRepulse(dx: number, dy: number, force: number) {
        let container = this.container;
        let options = container.options;
        const particle = this.particle;

        let f = Math.atan2(dy, dx);

        particle.velocity.horizontal = force * Math.cos(f);
        particle.velocity.vertical = force * Math.sin(f);

        if (options.particles.move.out_mode === OutMode.bounce || options.particles.move.out_mode === OutMode.bounceVertical) {
            let pos = {
                x: particle.position.x + particle.velocity.horizontal,
                y: particle.position.y + particle.velocity.vertical
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