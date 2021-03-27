import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import { Circle, Constants, Range, Rectangle, Utils } from "../../Utils";
import type { Container } from "../../Core/Container";
import { DivMode, DivType, HoverMode } from "../../Enums";
import { DivEvent } from "../../Options/Classes/Interactivity/Events/DivEvent";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { Vector } from "../../Core/Particle/Vector";

export class Bouncer implements IExternalInteractor {
    constructor(private readonly container: Container) {
    }

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.actualOptions;
        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;
        return (
            (mouse.position && events.onHover.enable && Utils.isInArray(HoverMode.bounce, events.onHover.mode)) ||
            Utils.isDivModeEnabled(DivMode.bounce, divs)
        );
    }

    public interact(): void {
        const container = this.container;
        const options = container.actualOptions;
        const events = options.interactivity.events;
        const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && Utils.isInArray(HoverMode.bounce, hoverMode)) {
            this.processMouseBounce();
        } else {
            Utils.divModeExecute(DivMode.bounce, divs, (selector, div): void =>
                this.singleSelectorBounce(selector, div)
            );
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
                Utils.circleBounce(Utils.circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    mass: radius ** 2 * Math.PI / 2,
                    velocity: Vector.create(0, 0),
                    factor: {
                        horizontal: 0,
                        vertical: 0,
                    },
                });
            } else if (area instanceof Rectangle) {
                Utils.rectBounce(particle, Utils.calculateBounds(position, radius));
            }
        }
    }
}
