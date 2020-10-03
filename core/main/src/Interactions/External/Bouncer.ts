import { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import { Container } from "../../Core/Container";
import { Circle, Range, Rectangle, Utils } from "../../Utils";
import { DivMode } from "../../Enums/Modes";
import { DivEvent } from "../../Options/Classes/Interactivity/Events/DivEvent";
import { DivType } from "../../Enums/Types";
import { ICoordinates } from "../../Core/Interfaces/ICoordinates";

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

        for (const particle of query) {
            if (area instanceof Circle) {
                Utils.circleBounce(Utils.circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    velocity: {
                        horizontal: 0,
                        vertical: 0,
                    },
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
