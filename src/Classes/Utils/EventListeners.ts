"use strict";

import {ClickMode} from "../../Enums/ClickMode";
import {Container} from "../Container";
import {InteractivityDetect} from "../../Enums/InteractivityDetect";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {PolygonMaskType} from "../../Enums/PolygonMaskType";

export class EventListeners {
    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    public addEventsListeners(): void {
        const container = this.container;
        const options = container.options;

        /* events target element */
        if (options.interactivity.detect_on === InteractivityDetect.window) {
            container.interactivity.element = window;
        } else if (container.options.interactivity.detect_on === InteractivityDetect.parent) {
            container.interactivity.element = container.canvas.element.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (options.interactivity.events.onhover.enable || options.interactivity.events.onclick.enable) {
            if (interactivityEl) {
                /* el on mousemove */
                interactivityEl.addEventListener("mousemove", (e: Event) => this.mouseTouchMove(e));

                /* el on touchstart */
                interactivityEl.addEventListener("touchstart", (e: Event) => this.mouseTouchMove(e));

                /* el on touchmove */
                interactivityEl.addEventListener("touchmove", (e: Event) => this.mouseTouchMove(e));

                if (!options.interactivity.events.onclick.enable) {
                    /* el on touchend */
                    interactivityEl.addEventListener("touchend", () => this.mouseTouchFinish());
                }

                /* el on onmouseleave */
                interactivityEl.addEventListener("mouseleave", () => this.mouseTouchFinish());

                /* el on touchcancel */
                interactivityEl.addEventListener("touchcancel", () => this.mouseTouchFinish());
            }
        }

        /* on click event */
        if (options.interactivity.events.onclick.enable) {
            if (interactivityEl) {
                interactivityEl.addEventListener("touchend", (e: Event) => this.mouseTouchClick(e));
                interactivityEl.addEventListener("mouseup", (e: Event) => this.mouseTouchClick(e));
            }
        }
    }

    private mouseTouchMove(e: Event): void {
        const container = this.container;
        const options = container.options;

        let pos: ICoordinates;

        if (e.type.startsWith("mouse")) {
            const mouseEvent = e as MouseEvent;

            if (container.interactivity.element === window) {
                pos = {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY,
                };
            } else if (options.interactivity.detect_on === InteractivityDetect.parent) {
                const source = mouseEvent.target as HTMLElement;
                const target = mouseEvent.currentTarget as HTMLElement;

                if (source && target) {
                    const sourceRect = source.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.offsetX + sourceRect.left - targetRect.left,
                        y: mouseEvent.offsetY + sourceRect.top - targetRect.top,
                    };
                } else {
                    pos = {
                        x: mouseEvent.offsetX || mouseEvent.clientX,
                        y: mouseEvent.offsetY || mouseEvent.clientY,
                    };
                }
            } else {
                pos = {
                    x: mouseEvent.offsetX || mouseEvent.clientX,
                    y: mouseEvent.offsetY || mouseEvent.clientY,
                };
            }
        } else {
            const touchEvent = e as TouchEvent;

            const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];

            pos = {
                x: lastTouch.clientX,
                y: lastTouch.clientY,
            };
        }

        container.interactivity.mouse.position = pos;

        if (container.retina.isRetina) {
            container.interactivity.mouse.position.x *= container.canvas.pxRatio;
            container.interactivity.mouse.position.y *= container.canvas.pxRatio;
        }

        container.interactivity.status = "mousemove";
    }

    private mouseTouchFinish(): void {
        const container = this.container;

        container.interactivity.mouse.position = null;
        container.interactivity.status = "mouseleave";
    }

    private mouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon.type !== PolygonMaskType.none && options.polygon.type !== PolygonMaskType.inline) {
            if (container.polygon.checkInsidePolygon(container.interactivity.mouse.position)) {
                this.doMouseTouchClick(e);
            }
        } else {
            this.doMouseTouchClick(e);
        }
    }

    private doMouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (container.interactivity.mouse.position) {
            container.interactivity.mouse.clickPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        }

        container.interactivity.mouse.clickTime = new Date().getTime();

        const pushNb = options.interactivity.modes.push.particles_nb;
        const removeNb = options.interactivity.modes.remove.particles_nb;

        switch (options.interactivity.events.onclick.mode) {
            case ClickMode.push:
                if (options.particles.move.enable) {
                    container.particles.push(pushNb, container.interactivity.mouse);
                } else {
                    if (options.interactivity.modes.push.particles_nb === 1) {
                        container.particles.push(pushNb, container.interactivity.mouse);
                    } else if (options.interactivity.modes.push.particles_nb > 1) {
                        container.particles.push(pushNb);
                    }
                }
                break;
            case ClickMode.remove:
                container.particles.remove(removeNb);
                break;
            case ClickMode.bubble:
                container.bubble.clicking = true;
                break;
            case ClickMode.repulse:
                container.repulse.clicking = true;
                container.repulse.count = 0;
                container.repulse.finish = false;
                setTimeout(() => {
                    container.repulse.clicking = false;
                }, options.interactivity.modes.repulse.duration * 1000);
                break;
        }

        e.preventDefault();

        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }

        e.preventDefault();
    }
}
