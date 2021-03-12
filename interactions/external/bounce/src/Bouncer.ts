import {
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    Constants,
    divModeExecute,
    isDivModeEnabled,
    isInArray,
    rectBounce,
    Circle,
    Range,
    Rectangle,
    HoverMode,
    DivMode,
    DivType,
    ExternalInteractorBase,
    Vector,
} from "tsparticles-engine";
import type { Container, ICoordinates } from "tsparticles-engine";
import type { DivEvent } from "tsparticles-engine/Options/Classes/Interactivity/Events/DivEvent";

export class Bouncer extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.options;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;
        return (
            (mouse.position && events.onHover.enable && isInArray(HoverMode.bounce, events.onHover.mode)) ||
            isDivModeEnabled(DivMode.bounce, divs)
        );
    }

    public interact(): void {
        const container = this.container;
        const options = container.options;
        const events = options.interactivity.events;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.bounce, hoverMode)) {
            this.processMouseBounce();
        } else {
            divModeExecute(DivMode.bounce, divs, (selector, div): void => this.singleSelectorBounce(selector, div));
        }
    }

    public reset(): void {
        // do nothing
    }

    private processMouseBounce(): void {
        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const tolerance = 10 * pxRatio;
        const mousePos = container.interactivity.mouse.position;
        const radius = container.retina.bounceModeDistance;

        if (mousePos) {
            this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
        }
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

        for (const particle of query) {
            if (area instanceof Circle) {
                circleBounce(circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    velocity: Vector.origin,
                    factor: Vector.origin,
                });
            } else if (area instanceof Rectangle) {
                rectBounce(particle, calculateBounds(position, radius));
            }
        }
    }
}
