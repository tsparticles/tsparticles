import type { Container } from "../../../Container";
import type { IBubblerProcessParam } from "../../../Interfaces/IBubblerProcessParam";
import { Circle, ColorUtils, Constants, Rectangle, Utils } from "../../../../Utils";
import { ClickMode, DivMode, DivType, HoverMode, ProcessBubbleType } from "../../../../Enums";
import { Particle } from "../../../Particle";
import { DivEvent } from "../../../../Options/Classes/Interactivity/Events/DivEvent";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
import { BubbleDiv } from "../../../../Options/Classes/Interactivity/Modes/BubbleDiv";

/**
 * Particle bubble manager
 */
export class Bubbler implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    private static calculateBubbleValue(
        particleValue: number,
        modeValue: number,
        optionsValue: number,
        ratio: number
    ): number | undefined {
        if (modeValue > optionsValue) {
            const size = particleValue + (modeValue - optionsValue) * ratio;

            return Utils.clamp(size, particleValue, modeValue);
        } else if (modeValue < optionsValue) {
            const size = particleValue - (optionsValue - modeValue) * ratio;

            return Utils.clamp(size, modeValue, particleValue);
        }
    }

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.options;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;

        const divBubble = Utils.isDivModeEnabled(DivMode.bubble, divs);

        if (
            !(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        return (
            Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode) || divBubble
        );
    }

    public reset(particle: Particle, force?: boolean): void {
        if (!particle.bubble.inRange || force) {
            delete particle.bubble.divId;
            delete particle.bubble.opacity;
            delete particle.bubble.radius;
            delete particle.bubble.color;
        }
    }

    public interact(): void {
        const options = this.container.options;
        const events = options.interactivity.events;
        const onHover = events.onHover;
        const onClick = events.onClick;
        const hoverEnabled = onHover.enable;
        const hoverMode = onHover.mode;
        const clickEnabled = onClick.enable;
        const clickMode = onClick.mode;
        const divs = events.onDiv;

        /* on hover event */
        if (hoverEnabled && Utils.isInArray(HoverMode.bubble, hoverMode)) {
            this.hoverBubble();
        } else if (clickEnabled && Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.clickBubble();
        } else {
            Utils.divModeExecute(DivMode.bubble, divs, (id, div): void => this.singleDivHover(id, div));
        }
    }

    private singleDivHover(id: string, div: DivEvent): void {
        const container = this.container;
        const elem = document.getElementById(id);

        if (!elem) {
            return;
        }

        const pxRatio = container.retina.pixelRatio;
        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
        };
        const repulseRadius = (elem.offsetWidth / 2) * pxRatio;

        const area =
            div.type === DivType.circle
                ? new Circle(pos.x, pos.y, repulseRadius)
                : new Rectangle(
                      elem.offsetLeft * pxRatio,
                      elem.offsetTop * pxRatio,
                      elem.offsetWidth * pxRatio,
                      elem.offsetHeight * pxRatio
                  );

        const query = container.particles.quadTree.query(area);

        for (const particle of query.filter((t) => area.contains(t.getPosition()))) {
            particle.bubble.inRange = true;

            const divs = container.options.interactivity.modes.bubble.divs;
            const divBubble = Utils.divMode(divs, id);

            if (!particle.bubble.divId || particle.bubble.divId !== id) {
                this.reset(particle, true);

                particle.bubble.divId = id;
            }

            /* size */
            this.hoverBubbleSize(particle, 1, divBubble);

            /* opacity */
            this.hoverBubbleOpacity(particle, 1, divBubble);

            /* color */
            this.hoverBubbleColor(particle, divBubble);
        }
    }

    private process(particle: Particle, distMouse: number, timeSpent: number, data: IBubblerProcessParam): void {
        const container = this.container;
        const bubbleParam = data.bubbleObj.optValue;

        if (bubbleParam === undefined) {
            return;
        }

        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleDistance = container.retina.bubbleModeDistance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;

        if (bubbleParam !== particlesParam) {
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
    }

    private clickBubble(): void {
        const container = this.container;
        const options = container.options;

        /* on click event */
        const mouseClickPos = container.interactivity.mouse.clickPosition;

        if (mouseClickPos === undefined) {
            return;
        }

        const distance = container.retina.bubbleModeDistance;
        //const query = container.particles.spatialGrid.queryRadius(mouseClickPos, distance);
        const query = container.particles.quadTree.query(new Circle(mouseClickPos.x, mouseClickPos.y, distance));

        for (const particle of query) {
            particle.bubble.inRange = true;

            const pos = particle.getPosition();
            const distMouse = Utils.getDistance(pos, mouseClickPos);
            const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

            if (container.bubble.clicking) {
                if (timeSpent > options.interactivity.modes.bubble.duration) {
                    container.bubble.durationEnd = true;
                }

                if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                    container.bubble.clicking = false;
                    container.bubble.durationEnd = false;
                }

                /* size */
                const sizeData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: container.retina.bubbleModeSize,
                        value: particle.bubble.radius,
                    },
                    particlesObj: {
                        optValue: particle.sizeValue ?? container.retina.sizeValue,
                        value: particle.size.value,
                    },
                    type: ProcessBubbleType.size,
                };

                this.process(particle, distMouse, timeSpent, sizeData);

                /* opacity */
                const opacityData: IBubblerProcessParam = {
                    bubbleObj: {
                        optValue: options.interactivity.modes.bubble.opacity,
                        value: particle.bubble.opacity,
                    },
                    particlesObj: {
                        optValue: particle.particlesOptions.opacity.value,
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
    }

    private hoverBubble(): void {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (mousePos === undefined) {
            return;
        }

        const distance = container.retina.bubbleModeDistance;
        //const query = container.particles.spatialGrid.queryRadiusWithDistance(mousePos, distance);
        const query = container.particles.quadTree.query(new Circle(mousePos.x, mousePos.y, distance));

        //for (const { distance, particle } of query) {
        for (const particle of query) {
            particle.bubble.inRange = true;

            const pos = particle.getPosition();
            const distance = Utils.getDistance(pos, mousePos);
            const ratio = 1 - distance / container.retina.bubbleModeDistance;

            /* mousemove - check ratio */
            if (distance <= container.retina.bubbleModeDistance) {
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
        const container = this.container;
        const modeSize = divBubble?.size
            ? divBubble.size * container.retina.pixelRatio
            : container.retina.bubbleModeSize;

        if (modeSize === undefined) {
            return;
        }

        const optSize = particle.sizeValue ?? container.retina.sizeValue;
        const pSize = particle.size.value;
        const size = Bubbler.calculateBubbleValue(pSize, modeSize, optSize, ratio);

        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }

    private hoverBubbleOpacity(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
        const options = this.container.options;
        const modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble.opacity;

        if (modeOpacity === undefined) {
            return;
        }

        const optOpacity = particle.particlesOptions.opacity.value;
        const pOpacity = particle.opacity.value;
        const opacity = Bubbler.calculateBubbleValue(pOpacity, modeOpacity, optOpacity, ratio);

        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }

    private hoverBubbleColor(particle: Particle, divBubble?: BubbleDiv): void {
        const options = this.container.options;

        if (particle.bubble.color === undefined) {
            const modeColor = divBubble?.color ?? options.interactivity.modes.bubble.color;

            if (modeColor === undefined) {
                return;
            }

            const bubbleColor = modeColor instanceof Array ? Utils.itemFromArray(modeColor) : modeColor;

            particle.bubble.color = ColorUtils.colorToHsl(bubbleColor);
        }
    }
}
