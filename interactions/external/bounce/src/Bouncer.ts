import type { BounceContainer, BounceMode, IBounceMode } from "./Types.js";
import {
    Circle,
    type DivEvent,
    DivType,
    ExternalInteractorBase,
    type ICoordinates,
    type IModes,
    type Modes,
    type Particle,
    type Range,
    Rectangle,
    type RecursivePartial,
    Vector,
    calculateBounds,
    circleBounce,
    circleBounceDataFromParticle,
    divModeExecute,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
    rectBounce,
} from "@tsparticles/engine";
import { Bounce } from "./Options/Classes/Bounce.js";

const bounceMode = "bounce",
    squareExp = 2,
    double = 2,
    half = 0.5,
    halfPI = Math.PI * half,
    toleranceFactor = 10,
    minRadius = 0;

export class Bouncer extends ExternalInteractorBase<BounceContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
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

        if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
            this._processMouseBounce();
        } else {
            divModeExecute(bounceMode, divs, (selector, div): void => this._singleSelectorBounce(selector, div));
        }

        await Promise.resolve();
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv;

        return (
            (!!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode)) ||
            isDivModeEnabled(bounceMode, divs)
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

    private readonly _processBounce: (position: ICoordinates, radius: number, area: Range) => void = (
        position,
        radius,
        area,
    ) => {
        const query = this.container.particles.quadTree.query(area, (p) => this.isEnabled(p));

        for (const particle of query) {
            if (area instanceof Circle) {
                circleBounce(circleBounceDataFromParticle(particle), {
                    position,
                    radius,
                    mass: radius ** squareExp * halfPI,
                    velocity: Vector.origin,
                    factor: Vector.origin,
                });
            } else if (area instanceof Rectangle) {
                rectBounce(particle, calculateBounds(position, radius));
            }
        }
    };

    private readonly _processMouseBounce: () => void = () => {
        const container = this.container,
            pxRatio = container.retina.pixelRatio,
            tolerance = toleranceFactor * pxRatio,
            mousePos = container.interactivity.mouse.position,
            radius = container.retina.bounceModeDistance;

        if (!radius || radius < minRadius || !mousePos) {
            return;
        }

        this._processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    };

    private readonly _singleSelectorBounce: (selector: string, div: DivEvent) => void = (selector, div) => {
        const container = this.container,
            query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach((item) => {
            const elem = item as HTMLElement,
                pxRatio = container.retina.pixelRatio,
                pos = {
                    x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
                },
                radius = elem.offsetWidth * half * pxRatio,
                tolerance = toleranceFactor * pxRatio,
                area =
                    div.type === DivType.circle
                        ? new Circle(pos.x, pos.y, radius + tolerance)
                        : new Rectangle(
                              elem.offsetLeft * pxRatio - tolerance,
                              elem.offsetTop * pxRatio - tolerance,
                              elem.offsetWidth * pxRatio + tolerance * double,
                              elem.offsetHeight * pxRatio + tolerance * double,
                          );

            this._processBounce(pos, radius, area);
        });
    };
}
