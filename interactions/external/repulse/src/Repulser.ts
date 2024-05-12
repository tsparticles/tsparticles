import {
    type BaseRange,
    Circle,
    type DivEvent,
    DivType,
    type Engine,
    ExternalInteractorBase,
    type ICoordinates,
    type IModes,
    type Modes,
    type Particle,
    Rectangle,
    type RecursivePartial,
    Vector,
    clamp,
    divMode,
    divModeExecute,
    getDistances,
    getEasing,
    isDivModeEnabled,
    isInArray,
    millisecondsToSeconds,
    mouseMoveEvent,
} from "@tsparticles/engine";
import type { IRepulseMode, RepulseContainer, RepulseMode } from "./Types.js";
import { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv.js";

const repulseMode = "repulse",
    minDistance = 0,
    repulseRadiusFactor = 6,
    repulseRadiusPower = 3,
    squarePower = 2,
    minRadius = 0,
    minSpeed = 0,
    easingOffset = 1,
    half = 0.5;

/**
 * Particle repulse manager
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
                repulseOpts = options.interactivity.modes.repulse;

            if (!repulseOpts || mode !== repulseMode) {
                return;
            }

            if (!container.repulse) {
                container.repulse = { particles: [] };
            }

            const repulse = container.repulse;

            repulse.clicking = true;
            repulse.count = 0;

            for (const particle of container.repulse.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }

                particle.velocity.setTo(particle.initialVelocity);
            }

            repulse.particles = [];
            repulse.finish = false;

            setTimeout(() => {
                if (container.destroyed) {
                    return;
                }

                repulse.clicking = false;
            }, repulseOpts.duration * millisecondsToSeconds);
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

    interact(): void {
        const container = this.container,
            options = container.actualOptions,
            mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
            events = options.interactivity.events,
            hover = events.onHover,
            hoverEnabled = hover.enable,
            hoverMode = hover.mode,
            click = events.onClick,
            clickEnabled = click.enable,
            clickMode = click.mode,
            divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
            this._hoverRepulse();
        } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
            this._clickRepulse();
        } else {
            divModeExecute(repulseMode, divs, (selector, div): void => this._singleSelectorRepulse(selector, div));
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv,
            hover = events.onHover,
            click = events.onClick,
            divRepulse = isDivModeEnabled(repulseMode, divs);

        if (!(divRepulse || (hover.enable && !!mouse.position) || (click.enable && mouse.clickPosition))) {
            return false;
        }

        const hoverMode = hover.mode,
            clickMode = click.mode;

        return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
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

    private readonly _clickRepulse: () => void = () => {
        const container = this.container,
            repulseOptions = container.actualOptions.interactivity.modes.repulse;

        if (!repulseOptions) {
            return;
        }

        const repulse = container.repulse ?? { particles: [] };

        if (!repulse.finish) {
            if (!repulse.count) {
                repulse.count = 0;
            }

            repulse.count++;

            if (repulse.count === container.particles.count) {
                repulse.finish = true;
            }
        }

        if (repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance;

            if (!repulseDistance || repulseDistance < minDistance) {
                return;
            }

            const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower),
                mouseClickPos = container.interactivity.mouse.clickPosition;

            if (mouseClickPos === undefined) {
                return;
            }

            const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
                query = container.particles.quadTree.query(range, p => this.isEnabled(p));

            for (const particle of query) {
                const { dx, dy, distance } = getDistances(mouseClickPos, particle.position),
                    d = distance ** squarePower,
                    velocity = repulseOptions.speed,
                    force = (-repulseRadius * velocity) / d;

                if (d <= repulseRadius) {
                    repulse.particles.push(particle);

                    const vect = Vector.create(dx, dy);

                    vect.length = force;

                    particle.velocity.setTo(vect);
                }
            }
        } else if (repulse.clicking === false) {
            for (const particle of repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }

            repulse.particles = [];
        }
    };

    private readonly _hoverRepulse: () => void = () => {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            repulseRadius = container.retina.repulseModeDistance;

        if (!repulseRadius || repulseRadius < minRadius || !mousePos) {
            return;
        }

        this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };

    private readonly _processRepulse: (
        position: ICoordinates,
        repulseRadius: number,
        area: BaseRange,
        divRepulse?: RepulseDiv,
    ) => void = (position, repulseRadius, area, divRepulse) => {
        const container = this.container,
            query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
            repulseOptions = container.actualOptions.interactivity.modes.repulse;

        if (!repulseOptions) {
            return;
        }

        const { easing, speed, factor, maxSpeed } = repulseOptions,
            easingFunc = getEasing(easing),
            velocity = (divRepulse?.speed ?? speed) * factor;

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position),
                repulseFactor = clamp(
                    easingFunc(easingOffset - distance / repulseRadius) * velocity,
                    minSpeed,
                    maxSpeed,
                ),
                normVec = Vector.create(
                    !distance ? velocity : (dx / distance) * repulseFactor,
                    !distance ? velocity : (dy / distance) * repulseFactor,
                );

            particle.position.addTo(normVec);
        }
    };

    private readonly _singleSelectorRepulse: (selector: string, div: DivEvent) => void = (selector, div) => {
        const container = this.container,
            repulse = container.actualOptions.interactivity.modes.repulse;

        if (!repulse) {
            return;
        }

        const query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach(item => {
            const elem = item as HTMLElement,
                pxRatio = container.retina.pixelRatio,
                pos = {
                    x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
                },
                repulseRadius = elem.offsetWidth * half * pxRatio,
                area =
                    div.type === DivType.circle
                        ? new Circle(pos.x, pos.y, repulseRadius)
                        : new Rectangle(
                              elem.offsetLeft * pxRatio,
                              elem.offsetTop * pxRatio,
                              elem.offsetWidth * pxRatio,
                              elem.offsetHeight * pxRatio,
                          ),
                divs = repulse.divs,
                divRepulse = divMode(divs, elem);

            this._processRepulse(pos, repulseRadius, area, divRepulse);
        });
    };
}

/* import {
    Circle,
    type DivEvent,
    DivType,
    type Engine,
    ExternalInteractorBase,
    type ICoordinates,
    type IDelta,
    type IModes,
    type Modes,
    type Range,
    Rectangle,
    type RecursivePartial
    Vector,
    clamp,
    divMode,
    divModeExecute,
    getDistances,
    getEasing,
    isDivModeEnabled,
    isInArray,
    mouseMoveEvent,
} from "@tsparticles/engine";
import type { IRepulseMode, RepulseContainer, RepulseMode, RepulseParticle } from "./Types.js";
import { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv.js";

/**
 * Particle repulse manager
 
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

            if (!repulse || mode !== repulseMode) {
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

        if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
            this.hoverRepulse(delta, inverse);
        } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
            this.clickRepulse(delta, inverse);
        } else {
            divModeExecute(repulseMode, divs, (selector, div): void =>
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

    interact(delta: IDelta): void {
        this.doInteract(delta);
    }

    isEnabled(particle?: RepulseParticle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            divs = events.onDiv,
            divRepulse = isDivModeEnabled(repulseMode, divs);

        if (
            !(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode,
            clickMode = events.onClick.mode;

        return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
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
