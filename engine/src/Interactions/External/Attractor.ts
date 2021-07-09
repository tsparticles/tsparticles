import type { Container } from "../../Core/Container";
import { ClickMode, HoverMode } from "../../Enums";
import { Circle, Constants, Range, getDistances, calcEasing, clamp, isInArray } from "../../Utils";
import type { ICoordinates } from "../../Core/Interfaces";
import { ExternalInteractorBase } from "../../Core/ExternalInteractorBase";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Attractor extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    isEnabled(): boolean {
        const container = this.container;
        const options = container.actualOptions;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;

        if (!((events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }

        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        return isInArray(HoverMode.attract, hoverMode) || isInArray(ClickMode.attract, clickMode);
    }

    reset(): void {
        // do nothing
    }

    interact(): void {
        const container = this.container;
        const options = container.actualOptions;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.attract, hoverMode)) {
            this.hoverAttract();
        } else if (clickEnabled && isInArray(ClickMode.attract, clickMode)) {
            this.clickAttract();
        }
    }

    private hoverAttract(): void {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const attractRadius = container.retina.attractModeDistance;

        this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    }

    private processAttract(position: ICoordinates, attractRadius: number, area: Range): void {
        const container = this.container;
        const attractOptions = container.actualOptions.interactivity.modes.attract;
        const query = container.particles.quadTree.query(area);

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };

            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = clamp(
                calcEasing(1 - distance / attractRadius, attractOptions.easing) * velocity,
                0,
                attractOptions.maxSpeed
            );

            particle.position.x -= normVec.x * attractFactor;
            particle.position.y -= normVec.y * attractFactor;
        }
    }

    private clickAttract(): void {
        const container = this.container;

        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }

            container.attract.count++;

            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }

        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition;

            if (!mousePos) {
                return;
            }

            const attractRadius = container.retina.attractModeDistance;

            this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
        } else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }

        return;
    }
}
