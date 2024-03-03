import type { BubbleContainer, BubbleMode, IBubbleMode } from "./Types.js";
import {
    Circle,
    type DivEvent,
    DivType,
    ExternalInteractorBase,
    type IDelta,
    type IModes,
    type Modes,
    type Particle,
    Rectangle,
    type RecursivePartial,
    colorMix,
    divMode,
    divModeExecute,
    getDistance,
    getRangeMax,
    isDivModeEnabled,
    isInArray,
    itemFromSingleOrMultiple,
    millisecondsToSeconds,
    mouseLeaveEvent,
    mouseMoveEvent,
    rangeColorToHsl,
    rgbToHsl,
} from "@tsparticles/engine";
import { Bubble } from "./Options/Classes/Bubble.js";
import type { BubbleDiv } from "./Options/Classes/BubbleDiv.js";
import type { Interfaces } from "./Interfaces.js";
import { ProcessBubbleType } from "./Enums.js";
import { calculateBubbleValue } from "./Utils.js";

const bubbleMode = "bubble",
    minDistance = 0,
    defaultClickTime = 0,
    double = 2,
    defaultOpacity = 1,
    ratioOffset = 1,
    defaultBubbleValue = 0,
    minRatio = 0,
    half = 0.5,
    defaultRatio = 1;

/**
 * Particle bubble manager
 */
export class Bubbler extends ExternalInteractorBase<BubbleContainer> {
    handleClickMode: (mode: string) => void;

    constructor(container: BubbleContainer) {
        super(container);

        if (!container.bubble) {
            container.bubble = {};
        }

        this.handleClickMode = (mode): void => {
            if (mode !== bubbleMode) {
                return;
            }

            if (!container.bubble) {
                container.bubble = {};
            }

            container.bubble.clicking = true;
        };
    }

    clear(particle: Particle, delta: IDelta, force?: boolean): void {
        if (particle.bubble.inRange && !force) {
            return;
        }

        delete particle.bubble.div;
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }

    init(): void {
        const container = this.container,
            bubble = container.actualOptions.interactivity.modes.bubble;

        if (!bubble) {
            return;
        }

        container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;

        if (bubble.size !== undefined) {
            container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
        }
    }

    interact(delta: IDelta): void {
        const options = this.container.actualOptions,
            events = options.interactivity.events,
            onHover = events.onHover,
            onClick = events.onClick,
            hoverEnabled = onHover.enable,
            hoverMode = onHover.mode,
            clickEnabled = onClick.enable,
            clickMode = onClick.mode,
            divs = events.onDiv;

        /* on hover event */
        if (hoverEnabled && isInArray(bubbleMode, hoverMode)) {
            this._hoverBubble();
        } else if (clickEnabled && isInArray(bubbleMode, clickMode)) {
            this._clickBubble();
        } else {
            divModeExecute(bubbleMode, divs, (selector, div): void => this._singleSelectorHover(delta, selector, div));
        }
    }

    isEnabled(particle?: Particle): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = (particle?.interactivity ?? options.interactivity).events,
            { onClick, onDiv, onHover } = events,
            divBubble = isDivModeEnabled(bubbleMode, onDiv);

        if (!(divBubble || (onHover.enable && !!mouse.position) || (onClick.enable && mouse.clickPosition))) {
            return false;
        }

        return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
    }

    loadModeOptions(
        options: Modes & BubbleMode,
        ...sources: RecursivePartial<(IModes & IBubbleMode) | undefined>[]
    ): void {
        if (!options.bubble) {
            options.bubble = new Bubble();
        }

        for (const source of sources) {
            options.bubble.load(source?.bubble);
        }
    }

    reset(particle: Particle): void {
        particle.bubble.inRange = false;
    }

    private readonly _clickBubble: () => void = () => {
        const container = this.container,
            options = container.actualOptions,
            mouseClickPos = container.interactivity.mouse.clickPosition,
            bubbleOptions = options.interactivity.modes.bubble;

        if (!bubbleOptions || !mouseClickPos) {
            return;
        }

        if (!container.bubble) {
            container.bubble = {};
        }

        const distance = container.retina.bubbleModeDistance;

        if (!distance || distance < minDistance) {
            return;
        }

        const query = container.particles.quadTree.queryCircle(mouseClickPos, distance, p => this.isEnabled(p)),
            { bubble } = container;

        for (const particle of query) {
            if (!bubble.clicking) {
                continue;
            }

            particle.bubble.inRange = !bubble.durationEnd;

            const pos = particle.getPosition(),
                distMouse = getDistance(pos, mouseClickPos),
                timeSpent =
                    (new Date().getTime() - (container.interactivity.mouse.clickTime ?? defaultClickTime)) /
                    millisecondsToSeconds;

            if (timeSpent > bubbleOptions.duration) {
                bubble.durationEnd = true;
            }

            if (timeSpent > bubbleOptions.duration * double) {
                bubble.clicking = false;
                bubble.durationEnd = false;
            }

            const sizeData: Interfaces = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: particle.bubble.radius,
                },
                particlesObj: {
                    optValue: getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
                    value: particle.size.value,
                },
                type: ProcessBubbleType.size,
            };

            this._process(particle, distMouse, timeSpent, sizeData);

            const opacityData: Interfaces = {
                bubbleObj: {
                    optValue: bubbleOptions.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: getRangeMax(particle.options.opacity.value),
                    value: particle.opacity?.value ?? defaultOpacity,
                },
                type: ProcessBubbleType.opacity,
            };

            this._process(particle, distMouse, timeSpent, opacityData);

            if (!bubble.durationEnd && distMouse <= distance) {
                this._hoverBubbleColor(particle, distMouse);
            } else {
                delete particle.bubble.color;
            }
        }
    };

    private readonly _hoverBubble: () => void = () => {
        const container = this.container,
            mousePos = container.interactivity.mouse.position,
            distance = container.retina.bubbleModeDistance;

        if (!distance || distance < minDistance || !mousePos) {
            return;
        }

        const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));

        // for (const { distance, particle } of query) {
        for (const particle of query) {
            particle.bubble.inRange = true;

            const pos = particle.getPosition(),
                pointDistance = getDistance(pos, mousePos),
                ratio = ratioOffset - pointDistance / distance;

            /* mousemove - check ratio */
            if (pointDistance <= distance) {
                if (ratio >= minRatio && container.interactivity.status === mouseMoveEvent) {
                    /* size */
                    this._hoverBubbleSize(particle, ratio);

                    /* opacity */
                    this._hoverBubbleOpacity(particle, ratio);

                    /* color */
                    this._hoverBubbleColor(particle, ratio);
                }
            } else {
                this.reset(particle);
            }

            /* mouseleave */
            if (container.interactivity.status === mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    };

    private readonly _hoverBubbleColor: (particle: Particle, ratio: number, divBubble?: BubbleDiv) => void = (
        particle,
        ratio,
        divBubble,
    ) => {
        const options = this.container.actualOptions,
            bubbleOptions = divBubble ?? options.interactivity.modes.bubble;

        if (!bubbleOptions) {
            return;
        }

        if (!particle.bubble.finalColor) {
            const modeColor = bubbleOptions.color;

            if (!modeColor) {
                return;
            }

            const bubbleColor = itemFromSingleOrMultiple(modeColor);

            particle.bubble.finalColor = rangeColorToHsl(bubbleColor);
        }

        if (!particle.bubble.finalColor) {
            return;
        }

        if (bubbleOptions.mix) {
            particle.bubble.color = undefined;

            const pColor = particle.getFillColor();

            particle.bubble.color = pColor
                ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, ratioOffset - ratio, ratio))
                : particle.bubble.finalColor;
        } else {
            particle.bubble.color = particle.bubble.finalColor;
        }
    };

    private readonly _hoverBubbleOpacity: (particle: Particle, ratio: number, divBubble?: BubbleDiv) => void = (
        particle,
        ratio,
        divBubble,
    ) => {
        const container = this.container,
            options = container.actualOptions,
            modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble?.opacity;

        if (!modeOpacity) {
            return;
        }

        const optOpacity = particle.options.opacity.value,
            pOpacity = particle.opacity?.value ?? defaultOpacity,
            opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);

        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    };

    private readonly _hoverBubbleSize: (particle: Particle, ratio: number, divBubble?: BubbleDiv) => void = (
        particle,
        ratio,
        divBubble,
    ) => {
        const container = this.container,
            modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

        if (modeSize === undefined) {
            return;
        }

        const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
            pSize = particle.size.value,
            size = calculateBubbleValue(pSize, modeSize, optSize, ratio);

        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    };

    private readonly _process: (particle: Particle, distMouse: number, timeSpent: number, data: Interfaces) => void = (
        particle,
        distMouse,
        timeSpent,
        data,
    ) => {
        const container = this.container,
            bubbleParam = data.bubbleObj.optValue,
            options = container.actualOptions,
            bubbleOptions = options.interactivity.modes.bubble;

        if (!bubbleOptions || bubbleParam === undefined) {
            return;
        }

        const bubbleDuration = bubbleOptions.duration,
            bubbleDistance = container.retina.bubbleModeDistance,
            particlesParam = data.particlesObj.optValue,
            pObjBubble = data.bubbleObj.value,
            pObj = data.particlesObj.value ?? defaultBubbleValue,
            type = data.type;

        if (!bubbleDistance || bubbleDistance < minDistance || bubbleParam === particlesParam) {
            return;
        }

        if (!container.bubble) {
            container.bubble = {};
        }

        if (container.bubble.durationEnd) {
            if (pObjBubble) {
                if (type === ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }

                if (type === ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        } else {
            if (distMouse <= bubbleDistance) {
                const obj = pObjBubble ?? pObj;

                if (obj !== bubbleParam) {
                    const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;

                    if (type === ProcessBubbleType.size) {
                        particle.bubble.radius = value;
                    }

                    if (type === ProcessBubbleType.opacity) {
                        particle.bubble.opacity = value;
                    }
                }
            } else {
                if (type === ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }

                if (type === ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        }
    };

    private readonly _singleSelectorHover: (delta: IDelta, selector: string, div: DivEvent) => void = (
        delta,
        selector,
        div,
    ) => {
        const container = this.container,
            selectors = document.querySelectorAll(selector),
            bubble = container.actualOptions.interactivity.modes.bubble;

        if (!bubble || !selectors.length) {
            return;
        }

        selectors.forEach(item => {
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
                query = container.particles.quadTree.query(area, p => this.isEnabled(p));

            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }

                particle.bubble.inRange = true;

                const divs = bubble.divs,
                    divBubble = divMode(divs, elem);

                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.clear(particle, delta, true);

                    particle.bubble.div = elem;
                }

                /* size */
                this._hoverBubbleSize(particle, defaultRatio, divBubble);

                /* opacity */
                this._hoverBubbleOpacity(particle, defaultRatio, divBubble);

                /* color */
                this._hoverBubbleColor(particle, defaultRatio, divBubble);
            }
        });
    };
}
