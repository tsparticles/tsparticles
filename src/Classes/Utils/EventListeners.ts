"use strict";

import { ClickMode } from "../../Enums/ClickMode";
import { Container } from "../Container";
import { InteractivityDetect } from "../../Enums/InteractivityDetect";
import { ICoordinates } from "../../Interfaces/ICoordinates";

export class EventListeners {
    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    public mouseTouchMove(e: Event): void {
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
            container.interactivity.mouse.position.x *= container.canvas.pxratio;
            container.interactivity.mouse.position.y *= container.canvas.pxratio;
        }

        container.interactivity.status = "mousemove";
    }

    public mouseTouchFinish(): void {
        const container = this.container;

        container.interactivity.mouse.position = null;
        container.interactivity.status = "mouseleave";
    }

    public mouseTouchClick(e: Event): void {
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
