import type { Container, Particle } from "tsparticles-engine";
import {
    Circle,
    clamp,
    colorToHsl,
    Constants,
    divMode,
    divModeExecute,
    getDistance,
    isDivModeEnabled,
    isInArray,
    itemFromArray,
    Rectangle,
    ClickMode,
    DivMode,
    DivType,
    HoverMode,
    ExternalInteractorBase,
} from "tsparticles-engine";
import type { DivEvent } from "tsparticles-engine/Options/Classes/Interactivity/Events/DivEvent";
import type { BubbleDiv } from "tsparticles-engine/Options/Classes/Interactivity/Modes/BubbleDiv";
import type { IBubblerProcessParam } from "./IBubblerProcessParam";
import { ProcessBubbleType } from "./ProcessBubbleType";

const calculateBubbleValue = (particleValue: number, modeValue: number, optionsValue: number, ratio: number) => {
    if (modeValue > optionsValue) {
        const size = particleValue + (modeValue - optionsValue) * ratio;

        return clamp(size, particleValue, modeValue);
    } else if (modeValue < optionsValue) {
        const size = particleValue - (optionsValue - modeValue) * ratio;

        return clamp(size, modeValue, particleValue);
    }
};

/**
 * Particle bubble manager
 * @category Interactions
 */
export class Bubbler extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    isEnabled(): boolean {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse,
            events = options.interactivity.events,
            divs = events.onDiv,
            divBubble = isDivModeEnabled(DivMode.bubble, divs);

        if (
            !(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        return isInArray(HoverMode.bubble, hoverMode) || isInArray(ClickMode.bubble, clickMode) || divBubble;
    }

    reset(particle: Particle, force?: boolean): void {
        if (!(!particle.bubble.inRange || force)) {
            return;
        }

        delete particle.bubble.div;
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }

    interact(): void {
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
        if (hoverEnabled && isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        } else if (clickEnabled && isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble();
        } else {
            divModeExecute(DivMode.bubble, divs, (selector, div): void => this.singleSelectorHover(selector, div));
        }
    }

    private singleSelectorHover(selector: string, div: DivEvent): void {
        const container = this.container,
            selectors = document.querySelectorAll(selector);

        if (!selectors.length) {
            return;
        }

        selectors.forEach((item) => {
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
                query = container.particles.quadTree.query(area);

            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }

                particle.bubble.inRange = true;

                const divs = container.actualOptions.interactivity.modes.bubble.divs;
                const divBubble = divMode(divs, elem);

                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.reset(particle, true);

                    particle.bubble.div = elem;
                }

                /* size */
                this.hoverBubbleSize(particle, 1, divBubble);

                /* opacity */
                this.hoverBubbleOpacity(particle, 1, divBubble);

                /* color */
                this.hoverBubbleColor(particle, divBubble);
            }
        });
    }

    private process(particle: Particle, distMouse: number, timeSpent: number, data: IBubblerProcessParam): void {
        const container = this.container,
            bubbleParam = data.bubbleObj.optValue;

        if (bubbleParam === undefined) {
            return;
        }

        const options = container.actualOptions,
            bubbleDuration = options.interactivity.modes.bubble.duration,
            bubbleDistance = container.retina.bubbleModeDistance,
            particlesParam = data.particlesObj.optValue,
            pObjBubble = data.bubbleObj.value,
            pObj = data.particlesObj.value || 0,
            type = data.type;

        if (bubbleParam === particlesParam) {
            return;
        }

        if (!container.bubble.durationEnd) {
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
        } else if (pObjBubble) {
            if (type === ProcessBubbleType.size) {
                delete particle.bubble.radius;
            }

            if (type === ProcessBubbleType.opacity) {
                delete particle.bubble.opacity;
            }
        }
    }

    private clickBubble(): void {
        const container = this.container,
            options = container.actualOptions,
            mouseClickPos = container.interactivity.mouse.clickPosition;

        if (!mouseClickPos) {
            return;
        }

        const distance = container.retina.bubbleModeDistance,
            query = container.particles.quadTree.queryCircle(mouseClickPos, distance);

        for (const particle of query) {
            if (!container.bubble.clicking) {
                continue;
            }

            particle.bubble.inRange = !container.bubble.durationEnd;

            const pos = particle.getPosition(),
                distMouse = getDistance(pos, mouseClickPos),
                timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

            if (timeSpent > options.interactivity.modes.bubble.duration) {
                container.bubble.durationEnd = true;
            }
            if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }

            const sizeValue = particle.options.size.value,
                sizeMaxValue =
                    (typeof sizeValue === "number" ? sizeValue : sizeValue.max) * container.retina.pixelRatio,
                sizeData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: container.retina.bubbleModeSize,
                        value: particle.bubble.radius,
                    },
                    particlesObj: {
                        optValue: sizeMaxValue,
                        value: particle.size.value,
                    },
                    type: ProcessBubbleType.size,
                };

            this.process(particle, distMouse, timeSpent, sizeData);

            const opacityValue = particle.options.opacity.value,
                opacityMaxValue =
                    (typeof opacityValue === "number" ? opacityValue : opacityValue.max) * container.retina.pixelRatio,
                opacityData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: options.interactivity.modes.bubble.opacity,
                        value: particle.bubble.opacity,
                    },
                    particlesObj: {
                        optValue: opacityMaxValue,
                        value: particle.opacity.value,
                    },
                    type: ProcessBubbleType.opacity,
                };

            this.process(particle, distMouse, timeSpent, opacityData);

            if (!container.bubble.durationEnd) {
                if (distMouse <= container.retina.bubbleModeDistance) {
                    this.hoverBubbleColor(particle);
                } else {
                    delete particle.bubble.color;
                }
            } else {
                delete particle.bubble.color;
            }
        }
    }

    private hoverBubble(): void {
        const container = this.container,
            mousePos = container.interactivity.mouse.position;

        if (mousePos === undefined) {
            return;
        }

        const distance = container.retina.bubbleModeDistance,
            query = container.particles.quadTree.queryCircle(mousePos, distance);

        //for (const { distance, particle } of query) {
        for (const particle of query) {
            particle.bubble.inRange = true;

            const pos = particle.getPosition(),
                pointDistance = getDistance(pos, mousePos),
                ratio = 1 - pointDistance / distance;

            /* mousemove - check ratio */
            if (pointDistance <= distance) {
                if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
                    /* size */
                    this.hoverBubbleSize(particle, ratio);

                    /* opacity */
                    this.hoverBubbleOpacity(particle, ratio);

                    /* color */
                    this.hoverBubbleColor(particle);
                }
            } else {
                this.reset(particle);
            }

            /* mouseleave */
            if (container.interactivity.status === Constants.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }

    private hoverBubbleSize(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
        const container = this.container,
            modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

        if (modeSize === undefined) {
            return;
        }

        const sizeValue = particle.options.size.value,
            sizeMaxValue = (typeof sizeValue === "number" ? sizeValue : sizeValue.max) * container.retina.pixelRatio,
            pSize = particle.size.value,
            size = calculateBubbleValue(pSize, modeSize, sizeMaxValue, ratio);

        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }

    private hoverBubbleOpacity(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
        const container = this.container,
            options = container.actualOptions,
            modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble.opacity;

        if (!modeOpacity) {
            return;
        }

        const opacityValue = particle.options.opacity.value,
            opacityMaxValue =
                (typeof opacityValue === "number" ? opacityValue : opacityValue.max) * container.retina.pixelRatio,
            pOpacity = particle.opacity.value,
            opacity = calculateBubbleValue(pOpacity, modeOpacity, opacityMaxValue, ratio);

        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }

    private hoverBubbleColor(particle: Particle, divBubble?: BubbleDiv): void {
        const options = this.container.actualOptions;

        if (particle.bubble.color !== undefined) {
            return;
        }

        const modeColor = divBubble?.color ?? options.interactivity.modes.bubble.color;

        if (!modeColor) {
            return;
        }

        const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;

        particle.bubble.color = colorToHsl(bubbleColor);
    }
}
