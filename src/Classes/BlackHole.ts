import type { ICoordinates } from "../Interfaces/ICoordinates";
import type { Container } from "./Container";
import type { Particle } from "./Particle";
import { IRgb } from "../Interfaces/IRgb";
import { IBlackHole } from "../Interfaces/Options/BlackHoles/IBlackHole";
import { ColorUtils } from "./Utils/ColorUtils";

export class BlackHole {
    public position: ICoordinates;
    public size: number;
    public limit?: number;
    public color: IRgb;
    public mass: number;

    private readonly container: Container;

    constructor(container: Container, options: IBlackHole) {
        this.container = container;

        let size = options.size.value;
        const random = typeof options.size.random === "boolean" ? options.size.random : options.size.random.enable;
        const minSize = typeof options.size.random === "boolean" ? 1 : options.size.random.minimumValue;

        if (random) {
            size = Math.random() * size + minSize;
        }

        this.size = size;
        this.mass = size * 5;

        this.limit = options.size.limit;

        const color = typeof options.color === "string" ? { value: options.color } : options.color;

        this.color = ColorUtils.colorToRgb(color) ?? {
            b: 0,
            g: 0,
            r: 0,
        };

        const offset = options.position ?? {
            x: 50,
            y: 50,
        };

        this.position = {
            x: offset.x * container.canvas.dimension.width / 100 - this.size / 2,
            y: offset.y * container.canvas.dimension.height / 100 - this.size / 2,
        };
    }

    public attract(particle: Particle): boolean {
        const container = this.container;
        const dx = this.position.x - particle.position.x;
        const dy = this.position.y - particle.position.y;
        const distance = Math.sqrt(Math.abs(dx * dx + dy * dy));
        const angle = Math.atan2(dx, dy) * (180 / Math.PI);
        const acceleration = this.mass / Math.pow(distance, 2);

        if (distance < this.size) {
            let remove = false;

            const sizeFactor = particle.size.value * 0.033;

            if (this.size > particle.size.value && distance < this.size - particle.size.value) {
                container.particles.remove(particle);
                remove = true;
            } else {
                particle.size.value -= sizeFactor;
                particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
                particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;

                console.log(particle.velocity);
            }

            if (this.limit === undefined || this.size < this.limit) {
                this.size += sizeFactor;
            }

            this.mass += sizeFactor;

            return !remove;
        } else {
            particle.velocity.horizontal += Math.sin(angle * (Math.PI / 180)) * acceleration;
            particle.velocity.vertical += Math.cos(angle * (Math.PI / 180)) * acceleration;

            return true;
        }
    }

    public draw(): void {
        const container = this.container;

        container.canvas.drawBlackHole(this);
    }
}