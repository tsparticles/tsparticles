import { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import { Container } from "../../Core/Container";
import { Circle, NumberUtils, Range, Rectangle, Utils } from "../../Utils";
import { DivMode } from "../../Enums/Modes";
import { DivEvent } from "../../Options/Classes/Interactivity/Events/DivEvent";
import { DivType } from "../../Enums/Types";
import { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { IParticle } from "../../Core/Interfaces/IParticle";
import { IVelocity } from "../../Core/Interfaces/IVelocity";

export class Bouncer implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    private static getRadius(particle: IParticle, fallback: number): number {
        return particle.bubble.radius || particle.size.value || fallback;
    }

    private static rotate(velocity: IVelocity, angle: number): IVelocity {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }

    private static collisionVelocity(v1: IVelocity, v2: IVelocity, m1: number, m2: number): IVelocity {
        return {
            horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
            vertical: v1.vertical,
        };
    }

    public interact(): void {
        const options = this.container.options;
        const events = options.interactivity.events;
        const divs = events.onDiv;

        Utils.divModeExecute(DivMode.bounce, divs, (selector, div): void => this.singleSelectorBounce(selector, div));
    }

    public isEnabled(): boolean {
        const options = this.container.options;
        const events = options.interactivity.events;
        const divs = events.onDiv;

        return Utils.isDivModeEnabled(DivMode.repulse, divs);
    }

    public reset(): void {
        // do nothing
    }

    private singleSelectorBounce(selector: string, div: DivEvent): void {
        const container = this.container;
        const query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach((item) => {
            const elem = item as HTMLElement;
            const pxRatio = container.retina.pixelRatio;
            const pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            };
            const radius = (elem.offsetWidth / 2) * pxRatio;
            const tolerance = 10 * pxRatio;

            const area =
                div.type === DivType.circle
                    ? new Circle(pos.x, pos.y, radius + tolerance)
                    : new Rectangle(
                          elem.offsetLeft * pxRatio - tolerance,
                          elem.offsetTop * pxRatio - tolerance,
                          elem.offsetWidth * pxRatio + tolerance * 2,
                          elem.offsetHeight * pxRatio + tolerance * 2
                      );

            this.processBounce(pos, radius, area);
        });
    }

    private processBounce(position: ICoordinates, radius: number, area: Range): void {
        const query = this.container.particles.quadTree.query(area);
        const divBounds = Utils.calculateBounds(position, radius);

        for (const particle of query) {
            const pPos = particle.getPosition();
            const offset = particle.offset;
            const size = particle.size.value;

            if (area instanceof Circle) {
                const pos1 = particle.getPosition();
                const pos2 = position;

                const xVelocityDiff = particle.velocity.horizontal;
                const yVelocityDiff = particle.velocity.vertical;

                const xDist = pos2.x - pos1.x;
                const yDist = pos2.y - pos1.y;

                // Prevent accidental overlap of particles
                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                    // Grab angle between the two colliding particles
                    const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);

                    // Store mass in var for better readability in collision equation
                    const m1 = size;
                    const m2 = radius;

                    // Velocity before equation
                    const u1 = Bouncer.rotate(particle.velocity, angle);
                    const u2 = Bouncer.rotate({ horizontal: 0, vertical: 0 }, angle);

                    // Velocity after 1d collision equation
                    const v1 = Bouncer.collisionVelocity(u1, u2, m1, m2);

                    // Final velocity after rotating axis back to original location
                    const vFinal1 = Bouncer.rotate(v1, -angle);

                    // Swap particle velocities for realistic bounce effect
                    const bounce1 = particle.particlesOptions.collisions.bounce;

                    particle.velocity.horizontal = vFinal1.horizontal * NumberUtils.getValue(bounce1.horizontal);
                    particle.velocity.vertical = vFinal1.vertical * NumberUtils.getValue(bounce1.vertical);
                }
            } else if (area instanceof Rectangle) {
                const bounds = Utils.calculateBounds(pPos, size);

                {
                    const velocity = particle.velocity.horizontal;
                    let bounced = false;

                    if (
                        bounds.top >= divBounds.top &&
                        bounds.bottom <= divBounds.bottom &&
                        ((bounds.right >= divBounds.left && bounds.right <= divBounds.right && velocity > 0) ||
                            (bounds.left <= divBounds.right && bounds.left >= divBounds.left && velocity < 0))
                    ) {
                        const newVelocity = NumberUtils.getValue(particle.particlesOptions.bounce.horizontal);

                        particle.velocity.horizontal *= -newVelocity;

                        bounced = true;
                    }

                    if (bounced) {
                        const minPos = offset.x + size;

                        if (bounds.top >= divBounds.top && bounds.bottom <= divBounds.bottom) {
                            if (bounds.right >= divBounds.left && bounds.right <= divBounds.right) {
                                particle.position.x = divBounds.left - minPos;
                            } else if (bounds.left <= divBounds.right && bounds.left >= divBounds.left) {
                                particle.position.x = divBounds.right + minPos;
                            }
                        }
                    }
                }

                {
                    const velocity = particle.velocity.vertical;
                    let bounced = false;

                    if (
                        (bounds.left >= divBounds.left &&
                            bounds.right <= divBounds.right &&
                            bounds.bottom >= divBounds.top &&
                            bounds.bottom <= divBounds.bottom &&
                            velocity > 0) ||
                        (bounds.top <= divBounds.bottom && bounds.top >= divBounds.top && velocity < 0)
                    ) {
                        const newVelocity = NumberUtils.getValue(particle.particlesOptions.bounce.vertical);

                        particle.velocity.vertical *= -newVelocity;

                        bounced = true;
                    }

                    if (bounced) {
                        const minPos = offset.y + size;

                        if (bounds.left >= divBounds.left && bounds.right <= divBounds.right) {
                            if (bounds.bottom >= divBounds.top && bounds.bottom <= divBounds.bottom) {
                                particle.position.y = divBounds.top - minPos;
                            } else if (bounds.top <= divBounds.bottom && bounds.top >= divBounds.top) {
                                particle.position.y = divBounds.bottom + minPos;
                            }
                        }
                    }
                }
            }
        }
    }
}
