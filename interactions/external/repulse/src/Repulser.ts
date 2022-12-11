import {
    Circle,
    ClickMode,
    DivMode,
    DivType,
    ExternalInteractorBase,
    HoverMode,
    Rectangle,
    Vector,
    clamp,
    divMode,
    divModeExecute,
    getDistances,
    getEasing,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
} from "tsparticles-engine";
import type {
    DivEvent,
    Engine,
    ICoordinates,
    IModes,
    Modes,
    Particle,
    Range,
    RecursivePartial,
} from "tsparticles-engine";
import type { IRepulseMode, RepulseContainer, RepulseMode } from "./Types";
import { Repulse } from "./Options/Classes/Repulse";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv";

/**
 * Particle repulse manager
 * @category Interactions
 */
export class Repulser extends ExternalInteractorBase<RepulseContainer> {
    handleClickMode: (mode: string) => void;

    private readonly _engine;

    constructor(engine: Engine, container: RepulseContainer) {
        super(container);

        this._engine = engine;

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

            const repulseRadius = Math.pow(repulseDistance / 6, 3),
                mouseClickPos = container.interactivity.mouse.clickPosition;

            if (mouseClickPos === undefined) {
                return;
            }

            const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
                query = container.particles.quadTree.query(range, (p) => this.isEnabled(p));

            for (const particle of query) {
                const { dx, dy, distance } = getDistances(mouseClickPos, particle.position),
                    d = distance ** 2,
                    velocity = repulse.speed,
                    force = (-repulseRadius * velocity) / d;

                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);

                    const vect = Vector.create(dx, dy);

                    vect.length = force;

                    particle.velocity.setTo(vect);
                }
            }
        } else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
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
                    getEasing(repulseOptions.easing)(1 - distance / repulseRadius) * velocity,
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

/*import {
    Circle,
    ClickMode,
    DivMode,
    DivType,
    ExternalInteractorBase,
    HoverMode,
    Rectangle,
    Vector,
    clamp,
    divMode,
    divModeExecute,
    getDistances,
    getEasing,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
} from "tsparticles-engine";
import type { DivEvent, Engine, ICoordinates, IDelta, IModes, Modes, Range, RecursivePartial } from "tsparticles-engine";
import type { IRepulseMode, RepulseContainer, RepulseMode, RepulseParticle } from "./Types";
import { Repulse } from "./Options/Classes/Repulse";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv";

/**
 * Particle repulse manager
 * @category Interactions
 *
export class Repulser extends ExternalInteractorBase<RepulseContainer> {
    handleClickMode: (mode: string) => void;

    private readonly _engine;

    constructor(engine: Engine, container: RepulseContainer) {
        super(container);

        this._engine = engine;

        this.handleClickMode = (mode): void => {
            const options = this.container.actualOptions,
                repulse = options.interactivity.modes.repulse;

            if (!repulse || mode !== ClickMode.repulse) {
                return;
            }
        };
    }

    clear(/*particle: RepulseParticle, delta: IDelta*): void {
        // if (particle.repulse || !particle.normalPosition) {
        //     return;
        // }
        //
        // const container = this.container,
        //     repulseOptions = container.actualOptions.interactivity.modes.repulse,
        //     repulseDistance = container.retina.repulseModeDistance;
        //
        // if (!repulseOptions || !repulseDistance) {
        //     return;
        // }
        //
        // this.particleRepulse(
        //     particle,
        //     delta,
        //     true,
        //     particle.normalPosition,
        //     repulseOptions,
        //     repulseDistance,
        //     repulseOptions.speed
        // );
    }

    doInteract(delta: IDelta, inverse = false): void {
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
            this.hoverRepulse(delta, inverse);
        } else if (clickEnabled && isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse(delta, inverse);
        } else {
            divModeExecute(DivMode.repulse, divs, (selector, div): void =>
                this.singleSelectorRepulse(delta, inverse, selector, div)
            );
        }
    }

    init(): void {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

        container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
    }

    async interact(delta: IDelta): Promise<void> {
        this.doInteract(delta);
    }

    isEnabled(particle?: RepulseParticle): boolean {
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

    reset(particle: RepulseParticle): void {
        particle.repulse = false;
    }

    private clickRepulse(delta: IDelta, inverse: boolean): void {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

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
            delta,
            inverse,
            mouseClickPos,
            repulseRadius,
            new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius)
        );
    }

    private hoverRepulse(delta: IDelta, inverse: boolean): void {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            repulseRadius = container.retina.repulseModeDistance;

        if (!repulseRadius || repulseRadius < 0 || !mousePos) {
            return;
        }

        this.processRepulse(delta, inverse, mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    }

    private particleRepulse(
        particle: RepulseParticle,
        delta: IDelta,
        inverse: boolean,
        position: ICoordinates,
        repulseOptions: Repulse,
        repulseRadius: number,
        speed: number
    ): void {
        const { dx, dy, distance } = getDistances(particle.position, position),
            velocity = speed * repulseOptions.factor * (inverse ? -1 : 1),
            repulseFactor = clamp(
                getEasing(repulseOptions.easing)(1 - distance / repulseRadius) * velocity,
                inverse ? -repulseOptions.maxSpeed : 0,
                inverse ? 0 : repulseOptions.maxSpeed
            ),
            normVec = Vector.create(
                distance === 0 ? repulseFactor : (dx / distance) * repulseFactor,
                distance === 0 ? repulseFactor : (dy / distance) * repulseFactor
            );

        if (!inverse) {
            if (!particle.normalPosition) {
                particle.normalPosition = particle.position.copy();
            } else {
                particle.normalPosition.add(particle.velocity);
            }

            particle.repulse = true;
        } else {
            if (
                particle.normalPosition &&
                particle.position.x - particle.normalPosition.x < 1 &&
                particle.position.y - particle.normalPosition.y < 1
            ) {
                particle.normalPosition = undefined;
                return;
            }
        }

        particle.position.addTo(normVec);
    }

    private processRepulse(
        delta: IDelta,
        inverse: boolean,
        position: ICoordinates,
        repulseRadius: number,
        area: Range,
        divRepulse?: RepulseDiv
    ): void {
        const container = this.container,
            query = container.particles.quadTree.query(area, (p) => this.isEnabled(p)) as RepulseParticle[],
            repulseOptions = container.actualOptions.interactivity.modes.repulse;

        if (!repulseOptions) {
            return;
        }

        for (const particle of query) {
            this.particleRepulse(
                particle,
                delta,
                inverse,
                position,
                repulseOptions,
                repulseRadius,
                divRepulse?.speed ?? repulseOptions.speed
            );
        }
    }

    private singleSelectorRepulse(delta: IDelta, inverse: boolean, selector: string, div: DivEvent): void {
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

            this.processRepulse(delta, inverse, pos, repulseRadius, area, divRepulse);
        });
    }
}
*/
