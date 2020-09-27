import { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import { Container } from "../../Core/Container";
import { Circle, NumberUtils, Range, Rectangle, Utils } from "../../Utils";
import { DivMode } from "../../Enums/Modes";
import { DivEvent } from "../../Options/Classes/Interactivity/Events/DivEvent";
import { DivType } from "../../Enums/Types";
import { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { IBounds } from "../../Core/Interfaces/IBounds";
import { IParticle } from "../../Core/Interfaces/IParticle";

interface IRectSideResult {
    velocity?: number;
    position?: number;
    bounced: boolean;
}

interface ISideData {
    min: number;
    max: number;
}

export class Bouncer implements IExternalInteractor {
    constructor(private readonly container: Container) {}

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
            if (area instanceof Circle) {
                const size = particle.getRadius();
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
                    const u1 = NumberUtils.rotateVelocity(particle.velocity, angle);
                    const u2 = NumberUtils.rotateVelocity({ horizontal: 0, vertical: 0 }, angle);

                    // Velocity after 1d collision equation
                    const v1 = NumberUtils.collisionVelocity(u1, u2, m1, m2);

                    // Final velocity after rotating axis back to original location
                    const vFinal1 = NumberUtils.rotateVelocity(v1, -angle);

                    // Swap particle velocities for realistic bounce effect
                    const bounce1 = particle.particlesOptions.bounce;

                    particle.velocity.horizontal = vFinal1.horizontal * NumberUtils.getValue(bounce1.horizontal);
                    particle.velocity.vertical = vFinal1.vertical * NumberUtils.getValue(bounce1.vertical);
                }
            } else if (area instanceof Rectangle) {
                Bouncer.rectBounce(particle, divBounds);
            }
        }
    }

    private static rectBounce(particle: IParticle, divBounds: IBounds): void {
        const pPos = particle.getPosition();
        const offset = particle.offset;
        const size = particle.getRadius();
        const bounds = Utils.calculateBounds(pPos, size);

        const resH = Bouncer.rectSideBounce(
            {
                min: bounds.left,
                max: bounds.right,
            },
            {
                min: bounds.top,
                max: bounds.bottom,
            },
            {
                min: divBounds.left,
                max: divBounds.right,
            },
            {
                min: divBounds.top,
                max: divBounds.bottom,
            },
            particle.velocity.horizontal,
            NumberUtils.getValue(particle.particlesOptions.bounce.horizontal),
            offset.x + size
        );

        if (resH.bounced) {
            if (resH.velocity !== undefined) {
                particle.velocity.horizontal = resH.velocity;
            }

            if (resH.position !== undefined) {
                particle.position.x = resH.position;
            }
        }

        const resV = Bouncer.rectSideBounce(
            {
                min: bounds.top,
                max: bounds.bottom,
            },
            {
                min: bounds.left,
                max: bounds.right,
            },
            {
                min: divBounds.top,
                max: divBounds.bottom,
            },
            {
                min: divBounds.left,
                max: divBounds.right,
            },
            particle.velocity.vertical,
            NumberUtils.getValue(particle.particlesOptions.bounce.vertical),
            offset.y + size
        );

        if (resV.bounced) {
            if (resV.velocity !== undefined) {
                particle.velocity.vertical = resV.velocity;
            }

            if (resV.position !== undefined) {
                particle.position.y = resV.position;
            }
        }
    }

    private static rectSideBounce(
        pSide: ISideData,
        pOtherSide: ISideData,
        rectSide: ISideData,
        rectOtherSide: ISideData,
        velocity: number,
        factor: number,
        minPos: number
    ): IRectSideResult {
        const res: IRectSideResult = { bounced: false };

        if (
            pOtherSide.min >= rectOtherSide.min &&
            pOtherSide.min <= rectOtherSide.max &&
            pOtherSide.max >= rectOtherSide.min &&
            pOtherSide.max <= rectOtherSide.max
        ) {
            if (
                (pSide.max >= rectSide.min && pSide.max <= rectSide.max && velocity > 0) ||
                (pSide.min <= rectSide.max && pSide.min >= rectSide.min && velocity < 0)
            ) {
                res.velocity = velocity * -factor;

                res.bounced = true;
            }

            if (res.bounced) {
                if (pSide.max >= rectSide.min && pSide.max <= rectSide.max) {
                    res.position = rectSide.min - minPos;
                } else if (pSide.min <= rectSide.max && pSide.min >= rectSide.min) {
                    res.position = rectSide.max + minPos;
                }
            }
        }

        return res;
    }
}
