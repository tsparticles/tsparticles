import {
    Circle,
    ClickMode,
    DivMode,
    DivType,
    ExternalInteractorBase,
    HoverMode,
    Rectangle,
    Vector,
    calcEasing,
    clamp,
    divMode,
    divModeExecute,
    getDistances,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
} from "tsparticles-engine";
import type { DivEvent, ICoordinates, IModes, Modes, Particle, Range, RecursivePartial } from "tsparticles-engine";
import type { IRepulseMode, RepulseContainer, RepulseMode } from "./Types";
import { Repulse } from "./Options/Classes/Repulse";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv";

/**
 * Particle repulse manager
 * @category Interactions
 */
export class Repulser extends ExternalInteractorBase<RepulseContainer> {
    handleClickMode: (mode: string) => void;

    constructor(container: RepulseContainer) {
        super(container);

        if (!container.repulse) {
            container.repulse = { particles: [] };
        }

        this.handleClickMode = (mode): void => {
            const options = this.container.actualOptions,
                repulse = options.interactivity.modes.repulse;

            if (!repulse || mode !== ClickMode.repulse) {
                return;
            }

            if (!container.repulse) {
                container.repulse = { particles: [] };
            }

            container.repulse.clicking = true;
            container.repulse.count = 0;

            for (const particle of container.repulse.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }

                particle.velocity.setTo(particle.initialVelocity);
            }

            container.repulse.particles = [];
            container.repulse.finish = false;

            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.repulse) {
                        container.repulse = { particles: [] };
                    }

                    container.repulse.clicking = false;
                }
            }, repulse.duration * 1000);
        };
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

        container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
    }

    async interact(): Promise<void> {
        const container = this.container,
            options = container.actualOptions,
            mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
            events = options.interactivity.events,
            hoverEnabled = events.onHover.enable,
            hoverMode = events.onHover.mode,
            clickEnabled = events.onClick.enable,
            clickMode = events.onClick.mode,
            divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        } else if (clickEnabled && isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        } else {
            divModeExecute(DivMode.repulse, divs, (selector, div): void => this.singleSelectorRepulse(selector, div));
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv,
            divRepulse = isDivModeEnabled(DivMode.repulse, divs);

        if (
            !(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(HoverMode.repulse, hoverMode) || isInArray(ClickMode.repulse, clickMode) || divRepulse;
    }

    loadModeOptions(
        options: Modes & RepulseMode,
        ...sources: RecursivePartial<(IModes & IRepulseMode) | undefined>[]
    ): void {
        if (!options.repulse) {
            options.repulse = new Repulse();
        }

        for (const source of sources) {
            options.repulse.load(source?.repulse);
        }
    }

    reset(): void {
        // do nothing
    }

    private clickRepulse(): void {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

        if (!container.repulse) {
            container.repulse = { particles: [] };
        }

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

            if (!repulseDistance || repulseDistance < 0) {
                return;
            }

            const repulseRadius = repulseDistance,
                mouseClickPos = container.interactivity.mouse.clickPosition;

            if (mouseClickPos === undefined) {
                return;
            }

            this.processRepulse(
                mouseClickPos,
                repulseRadius,
                new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius)
            );
        } else if (container.repulse.clicking === false) {
            container.repulse.particles = [];
        }
    }

    private hoverRepulse(): void {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            repulseRadius = container.retina.repulseModeDistance;

        if (!repulseRadius || repulseRadius < 0 || !mousePos) {
            return;
        }

        this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    }

    private processRepulse(position: ICoordinates, repulseRadius: number, area: Range, divRepulse?: RepulseDiv): void {
        const container = this.container,
            query = container.particles.quadTree.query(area, (p) => this.isEnabled(p)),
            repulseOptions = container.actualOptions.interactivity.modes.repulse;

        if (!repulseOptions) {
            return;
        }

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position),
                velocity = (divRepulse?.speed ?? repulseOptions.speed) * repulseOptions.factor,
                repulseFactor = clamp(
                    calcEasing(1 - distance / repulseRadius, repulseOptions.easing) * velocity,
                    0,
                    repulseOptions.maxSpeed
                ),
                normVec = Vector.create(
                    distance === 0 ? velocity : (dx / distance) * repulseFactor,
                    distance === 0 ? velocity : (dy / distance) * repulseFactor
                );

            particle.position.addTo(normVec);
        }
    }

    private singleSelectorRepulse(selector: string, div: DivEvent): void {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

        const query = document.querySelectorAll(selector);

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
                repulseRadius = (elem.offsetWidth / 2) * pxRatio,
                area =
                    div.type === DivType.circle
                        ? new Circle(pos.x, pos.y, repulseRadius)
                        : new Rectangle(
                              elem.offsetLeft * pxRatio,
                              elem.offsetTop * pxRatio,
                              elem.offsetWidth * pxRatio,
                              elem.offsetHeight * pxRatio
                          ),
                divs = repulse.divs,
                divRepulse = divMode(divs, elem);

            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
}
