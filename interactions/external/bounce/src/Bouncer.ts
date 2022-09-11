import type { BounceContainer, BounceMode, IBounceMode } from "./Types";
import {
    Circle,
    DivMode,
    DivType,
    ExternalInteractorBase,
    HoverMode,
    Rectangle,
    Vector,
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    divModeExecute,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
    rectBounce,
} from "tsparticles-engine";
import type { DivEvent, ICoordinates, IModes, Modes, Particle, Range, RecursivePartial } from "tsparticles-engine";
import { Bounce } from "./Options/Classes/Bounce";

export class Bouncer extends ExternalInteractorBase<BounceContainer> {
    constructor(container: BounceContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            bounce = container.actualOptions.interactivity.modes.bounce;

        if (!bounce) {
            return;
        }

        container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            events = options.interactivity.events,
            mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.bounce, hoverMode)) {
            this.processMouseBounce();
        } else {
            divModeExecute(DivMode.bounce, divs, (selector, div): void => this.singleSelectorBounce(selector, div));
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv;

        return (
            (mouse.position && events.onHover.enable && isInArray(HoverMode.bounce, events.onHover.mode)) ||
            isDivModeEnabled(DivMode.bounce, divs)
        );
    }

    loadModeOptions(
        options: Modes & BounceMode,
        ...sources: RecursivePartial<(IModes & IBounceMode) | undefined>[]
    ): void {
        if (!options.bounce) {
            options.bounce = new Bounce();
        }

        for (const source of sources) {
            options.bounce.load(source?.bounce);
        }
    }

    reset(): void {
        // do nothing
    }

    private processBounce(position: ICoordinates, radius: number, area: Range): void {
        const query = this.container.particles.quadTree.query(area, (p) => this.isEnabled(p));

        for (const particle of query) {
            if (area instanceof Circle) {
                circleBounce(circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    mass: (radius ** 2 * Math.PI) / 2,
                    velocity: Vector.origin,
                    factor: Vector.origin,
                });
            } else if (area instanceof Rectangle) {
                rectBounce(particle, calculateBounds(position, radius));
            }
        }
    }

    private processMouseBounce(): void {
        const container = this.container,
            pxRatio = container.retina.pixelRatio,
            tolerance = 10 * pxRatio,
            mousePos = container.interactivity.mouse.position,
            radius = container.retina.bounceModeDistance;

        if (!radius || radius < 0 || !mousePos) {
            return;
        }

        this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    }

    private singleSelectorBounce(selector: string, div: DivEvent): void {
        const container = this.container,
            query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach((item) => {
            const elem = item as HTMLElement,
                pxRatio = container.retina.pixelRatio,
                pos = {
                    x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
                },
                radius = (elem.offsetWidth / 2) * pxRatio,
                tolerance = 10 * pxRatio,
                area =
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
}
