import type { Container } from "../Core/Container";
import { ClickMode, InteractivityDetect } from "../Enums";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { Constants } from "./Constants";

/**
 * Particles container event listeners manager
 */
export class EventListeners {
    private readonly mouseMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchStartHandler: EventListenerOrEventListenerObject;
    private readonly touchMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchEndHandler: EventListenerOrEventListenerObject;
    private readonly mouseLeaveHandler: EventListenerOrEventListenerObject;
    private readonly touchCancelHandler: EventListenerOrEventListenerObject;
    private readonly touchEndClickHandler: EventListenerOrEventListenerObject;
    private readonly mouseDownHandler: EventListenerOrEventListenerObject;
    private readonly mouseUpHandler: EventListenerOrEventListenerObject;
    private readonly visibilityChangeHandler: EventListenerOrEventListenerObject;
    private readonly resizeHandler: EventListenerOrEventListenerObject;

    private canPush: boolean;

    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(private readonly container: Container) {
        this.canPush = true;

        this.mouseMoveHandler = (e: Event): void => this.mouseTouchMove(e);
        this.touchStartHandler = (e: Event): void => this.mouseTouchMove(e);
        this.touchMoveHandler = (e: Event): void => this.mouseTouchMove(e);
        this.touchEndHandler = (): void => this.mouseTouchFinish();
        this.mouseLeaveHandler = (): void => this.mouseTouchFinish();
        this.touchCancelHandler = (): void => this.mouseTouchFinish();
        this.touchEndClickHandler = (e: Event): void => this.mouseTouchClick(e);
        this.mouseUpHandler = (e: Event): void => this.mouseTouchClick(e);
        this.mouseDownHandler = (): void => this.mouseDown();
        this.visibilityChangeHandler = (): void => this.handleVisibilityChange();
        this.resizeHandler = (): void => this.handleWindowResize();
    }

    private static manageListener(
        element: HTMLElement | Node | Window,
        event: string,
        handler: EventListenerOrEventListenerObject,
        add: boolean,
        options?: boolean | AddEventListenerOptions | EventListenerObject
    ): void {
        if (add) {
            let addOptions: AddEventListenerOptions = { passive: true };

            if (typeof options === "boolean") {
                addOptions.capture = options;
            } else if (options !== undefined) {
                addOptions = options as AddEventListenerOptions;
            }

            element.addEventListener(event, handler, addOptions);
        } else {
            const removeOptions = options as boolean | EventListenerOptions | undefined;

            element.removeEventListener(event, handler, removeOptions);
        }
    }

    /**
     * Adding all listeners
     */
    public addListeners(): void {
        this.manageListeners(true);
    }

    /**
     * Removing all listeners
     */
    public removeListeners(): void {
        this.manageListeners(false);
    }

    /**
     * Initializing event listeners
     */
    private manageListeners(add: boolean): void {
        const container = this.container;
        const options = container.options;
        const detectType = options.interactivity.detectsOn;
        let mouseLeaveEvent = Constants.mouseLeaveEvent;

        /* events target element */
        if (detectType === InteractivityDetect.window) {
            container.interactivity.element = window;

            mouseLeaveEvent = Constants.mouseOutEvent;
        } else if (detectType === InteractivityDetect.parent && container.canvas.element) {
            container.interactivity.element = container.canvas.element.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (
            interactivityEl &&
            (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)
        ) {
            /* el on mousemove */
            EventListeners.manageListener(interactivityEl, Constants.mouseMoveEvent, this.mouseMoveHandler, add);

            /* el on touchstart */
            EventListeners.manageListener(interactivityEl, Constants.touchStartEvent, this.touchStartHandler, add);

            /* el on touchmove */
            EventListeners.manageListener(interactivityEl, Constants.touchMoveEvent, this.touchMoveHandler, add);

            if (!options.interactivity.events.onClick.enable) {
                /* el on touchend */
                EventListeners.manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndHandler, add);
            }

            /* el on onmouseleave */
            EventListeners.manageListener(interactivityEl, mouseLeaveEvent, this.mouseLeaveHandler, add);

            /* el on touchcancel */
            EventListeners.manageListener(interactivityEl, Constants.touchCancelEvent, this.touchCancelHandler, add);
        }

        /* on click event */
        if (options.interactivity.events.onClick.enable && interactivityEl) {
            EventListeners.manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndClickHandler, add);
            EventListeners.manageListener(interactivityEl, Constants.mouseUpEvent, this.mouseUpHandler, add);
            EventListeners.manageListener(interactivityEl, Constants.mouseDownEvent, this.mouseDownHandler, add);
        }

        if (options.interactivity.events.resize) {
            EventListeners.manageListener(window, Constants.resizeEvent, this.resizeHandler, add);
        }

        if (document) {
            EventListeners.manageListener(
                document,
                Constants.visibilityChangeEvent,
                this.visibilityChangeHandler,
                add,
                false
            );
        }
    }

    private handleWindowResize(): void {
        const container = this.container;
        const options = container.options;
        const canvas = container.canvas.element;

        if (!canvas) {
            return;
        }

        const pxRatio = container.retina.pixelRatio;

        container.canvas.size.width = canvas.offsetWidth * pxRatio;
        container.canvas.size.height = canvas.offsetHeight * pxRatio;

        canvas.width = container.canvas.size.width;
        canvas.height = container.canvas.size.height;

        /* repaint canvas on anim disabled */
        if (!options.particles.move.enable) {
            container.particles.redraw();
        }

        /* density particles enabled */
        container.densityAutoParticles();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }

    private handleVisibilityChange(): void {
        const container = this.container;
        const options = container.options;

        this.mouseTouchFinish();

        if (!options.pauseOnBlur) {
            return;
        }

        if (document?.hidden) {
            container.pageHidden = true;

            container.pause();
        } else {
            container.pageHidden = false;

            if (container.getAnimationStatus()) {
                container.play(true);
            } else {
                container.draw();
            }
        }
    }

    private mouseDown(): void {
        const interactivity = this.container.interactivity;

        if (interactivity) {
            const mouse = interactivity.mouse;

            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        }
    }

    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */
    private mouseTouchMove(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (container.interactivity?.element === undefined) {
            return;
        }

        container.interactivity.mouse.inside = true;

        let pos: ICoordinates | undefined;

        const canvas = container.canvas.element;

        if (e.type.startsWith("mouse")) {
            this.canPush = true;

            const mouseEvent = e as MouseEvent;

            if (container.interactivity.element === window) {
                if (canvas) {
                    const clientRect = canvas.getBoundingClientRect();

                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
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
                if (mouseEvent.target === container.canvas.element) {
                    pos = {
                        x: mouseEvent.offsetX || mouseEvent.clientX,
                        y: mouseEvent.offsetY || mouseEvent.clientY,
                    };
                }
            }
        } else {
            this.canPush = e.type !== "touchmove";

            const touchEvent = e as TouchEvent;
            const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
            const canvasRect = canvas?.getBoundingClientRect();

            pos = {
                x: lastTouch.clientX - (canvasRect?.left ?? 0),
                y: lastTouch.clientY - (canvasRect?.top ?? 0),
            };
        }

        const pxRatio = container.retina.pixelRatio;

        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }

        container.interactivity.mouse.position = pos;
        container.interactivity.status = Constants.mouseMoveEvent;
    }

    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish(): void {
        const container = this.container;
        const interactivity = container.interactivity;

        if (interactivity === undefined) {
            return;
        }

        const mouse = interactivity.mouse;

        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;

        interactivity.status = Constants.mouseLeaveEvent;
        mouse.inside = false;
        mouse.clicking = false;
    }

    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;
        const mouse = container.interactivity.mouse;

        mouse.inside = true;

        let handled = false;

        const mousePosition = mouse.position;

        if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
            return;
        }

        for (const [, plugin] of container.plugins) {
            if (plugin.clickPositionValid !== undefined) {
                handled = plugin.clickPositionValid(mousePosition);

                if (handled) {
                    break;
                }
            }
        }

        if (!handled) {
            this.doMouseTouchClick(e);
        }

        mouse.clicking = false;
    }

    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */
    private doMouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (this.canPush) {
            const mousePos = container.interactivity.mouse.position;
            if (mousePos) {
                container.interactivity.mouse.clickPosition = {
                    x: mousePos.x,
                    y: mousePos.y,
                };
            } else {
                return;
            }

            container.interactivity.mouse.clickTime = new Date().getTime();

            const onClick = options.interactivity.events.onClick;

            if (onClick.mode instanceof Array) {
                for (const mode of onClick.mode) {
                    this.handleClickMode(mode);
                }
            } else {
                this.handleClickMode(onClick.mode);
            }
        }

        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }

    private handleClickMode(mode: ClickMode | string): void {
        const container = this.container;
        const options = container.options;
        const pushNb = options.interactivity.modes.push.quantity;
        const removeNb = options.interactivity.modes.remove.quantity;

        switch (mode) {
            case ClickMode.push: {
                if (pushNb > 0) {
                    if (options.particles.move.enable) {
                        container.particles.push(pushNb, container.interactivity.mouse);
                    } else {
                        if (pushNb === 1) {
                            container.particles.push(pushNb, container.interactivity.mouse);
                        } else if (pushNb > 1) {
                            container.particles.push(pushNb);
                        }
                    }
                }

                break;
            }
            case ClickMode.remove:
                container.particles.removeQuantity(removeNb);
                break;
            case ClickMode.bubble:
                container.bubble.clicking = true;
                break;
            case ClickMode.repulse:
                container.repulse.clicking = true;
                container.repulse.count = 0;

                for (const particle of container.repulse.particles) {
                    particle.velocity.horizontal = particle.initialVelocity.horizontal;
                    particle.velocity.vertical = particle.initialVelocity.vertical;
                }

                container.repulse.particles = [];
                container.repulse.finish = false;

                setTimeout(() => {
                    if (!container.destroyed) {
                        container.repulse.clicking = false;
                    }
                }, options.interactivity.modes.repulse.duration * 1000);

                break;
            case ClickMode.attract:
                container.attract.clicking = true;
                container.attract.count = 0;

                for (const particle of container.attract.particles) {
                    particle.velocity.horizontal = particle.initialVelocity.horizontal;
                    particle.velocity.vertical = particle.initialVelocity.vertical;
                }

                container.attract.particles = [];
                container.attract.finish = false;

                setTimeout(() => {
                    if (!container.destroyed) {
                        container.attract.clicking = false;
                    }
                }, options.interactivity.modes.attract.duration * 1000);

                break;
            case ClickMode.pause:
                if (container.getAnimationStatus()) {
                    container.pause();
                } else {
                    container.play();
                }

                break;
        }

        for (const [, plugin] of container.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }
}
