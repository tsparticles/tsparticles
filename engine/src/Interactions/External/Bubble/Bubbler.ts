import type { Container } from "../../../Core/Container";
import {
    Circle,
    clamp,
    colorMix,
    colorToHsl,
    Constants,
    divMode,
    divModeExecute,
    getDistance,
    getRangeMax,
    isDivModeEnabled,
    isInArray,
    itemFromArray,
    Rectangle,
    rgbToHsl,
} from "../../../Utils";
import { ClickMode, DivMode, DivType, HoverMode } from "../../../Enums";
import { Particle } from "../../../Core/Particle";
import { DivEvent } from "../../../Options/Classes/Interactivity/Events/DivEvent";
import { BubbleDiv } from "../../../Options/Classes/Interactivity/Modes/BubbleDiv";
import { ExternalInteractorBase } from "../../../Core/ExternalInteractorBase";
import { ProcessBubbleType } from "./ProcessBubbleType";
import type { IBubblerProcessParam } from "./IBubblerProcessParam";

function calculateBubbleValue(
    particleValue: number,
    modeValue: number,
    optionsValue: number,
    ratio: number
): number | undefined {
    if (modeValue >= optionsValue) {
        const value = particleValue + (modeValue - optionsValue) * ratio;

        return clamp(value, particleValue, modeValue);
    } else if (modeValue < optionsValue) {
        const value = particleValue - (optionsValue - modeValue) * ratio;

        return clamp(value, modeValue, particleValue);
    }
}

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
                this.hoverBubbleColor(particle, 1, divBubble);
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
            const sizeData: IBubblerProcessParam = {
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

            this.process(particle, distMouse, timeSpent, sizeData);

            const opacityData: IBubblerProcessParam = {
                bubbleObj: {
                    optValue: options.interactivity.modes.bubble.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: getRangeMax(particle.options.opacity.value),
                    value: particle.opacity.value,
                },
                type: ProcessBubbleType.opacity,
            };

            this.process(particle, distMouse, timeSpent, opacityData);

            if (!container.bubble.durationEnd) {
                if (distMouse <= container.retina.bubbleModeDistance) {
                    this.hoverBubbleColor(particle, distMouse);
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
                    this.hoverBubbleColor(particle, ratio);
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

        const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
        const pSize = particle.size.value;
        const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);

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

        const optOpacity = particle.options.opacity.value;
        const pOpacity = particle.opacity.value;
        const opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);

        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }

    private hoverBubbleColor(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
        const options = this.container.actualOptions;
        const bubbleOptions = divBubble ?? options.interactivity.modes.bubble;

        if (!particle.bubble.finalColor) {
            const modeColor = bubbleOptions.color;

            if (!modeColor) {
                return;
            }

            const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;

            particle.bubble.finalColor = colorToHsl(bubbleColor);
        }

        if (!particle.bubble.finalColor) {
            return;
        }

        if (bubbleOptions.mix) {
            particle.bubble.color = undefined;

            const pColor = particle.getFillColor();

            particle.bubble.color = pColor
                ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio))
                : particle.bubble.finalColor;
        } else {
            particle.bubble.color = particle.bubble.finalColor;
        }
    }
}
