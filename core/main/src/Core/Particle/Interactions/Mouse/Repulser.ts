import type { Container } from "../../../Container";
import { ClickMode, DivMode, DivType, HoverMode, OutMode } from "../../../../Enums";
import { Circle, Constants, Range, Rectangle, Utils } from "../../../../Utils";
import type { ICoordinates } from "../../../Interfaces/ICoordinates";
import type { IParticle } from "../../../Interfaces/IParticle";
import { DivEvent } from "../../../../Options/Classes/Interactivity/Events/DivEvent";
import { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
import { RepulseDiv } from "../../../../Options/Classes/Interactivity/Modes/RepulseDiv";

/**
 * Particle repulse manager
 */
export class Repulser implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.options;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;

        const divBubble = Utils.isDivModeEnabled(DivMode.repulse, divs);

        if (
            !(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        return (
            Utils.isInArray(HoverMode.repulse, hoverMode) || Utils.isInArray(ClickMode.repulse, clickMode) || divBubble
        );
    }

    public reset(): void {
        // do nothing
    }

    public interact(): void {
        const container = this.container;
        const options = container.options;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;
        const divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        } else if (clickEnabled && Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        } else {
            Utils.divModeExecute(DivMode.repulse, divs, (id, div): void => this.singleDivRepulse(id, div));
        }
    }

    private singleDivRepulse(id: string, div: DivEvent): void {
        const container = this.container;
        const elem = document.getElementById(id);

        if (!elem) {
            return;
        }

        const pxRatio = container.retina.pixelRatio;
        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
        };
        const repulseRadius = (elem.offsetWidth / 2) * pxRatio;

        const area =
            div.type === DivType.circle
                ? new Circle(pos.x, pos.y, repulseRadius)
                : new Rectangle(
                      elem.offsetLeft * pxRatio,
                      elem.offsetTop * pxRatio,
                      elem.offsetWidth * pxRatio,
                      elem.offsetHeight * pxRatio
                  );

        const divs = container.options.interactivity.modes.repulse.divs;
        const divRepulse = Utils.divMode(divs, id);

        this.processRepulse(pos, repulseRadius, area, divRepulse);
    }

    private hoverRepulse(): void {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const repulseRadius = container.retina.repulseModeDistance;

        this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    }

    private processRepulse(position: ICoordinates, repulseRadius: number, area: Range, divRepulse?: RepulseDiv): void {
        const container = this.container;
        //const query = container.particles.spatialGrid.queryRadius(position, repulseRadius);
        const query = container.particles.quadTree.query(area);

        for (const particle of query) {
            const { dx, dy, distance } = Utils.getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };

            const velocity = (divRepulse?.speed ?? container.options.interactivity.modes.repulse.speed) * 100;
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

    private clickRepulse(): void {
        const container = this.container;

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
                    this.processClickRepulse(particle, dx, dy, force);
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

    private processClickRepulse(particle: IParticle, dx: number, dy: number, force: number): void {
        const container = this.container;
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
