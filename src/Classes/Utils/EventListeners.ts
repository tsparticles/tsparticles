import { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import { InteractivityDetect } from "../../Enums/InteractivityDetect";
import type { ICoordinates } from "../../Interfaces/ICoordinates";
import { PolygonMaskType } from "../../Enums/PolygonMaskType";
import { Constants } from "./Constants";
import { Emitter } from "../Emitter";
import { Utils } from "./Utils";
import type { IEmitter } from "../../Interfaces/Options/Emitters/IEmitter";
import type { IAbsorber } from "../../Interfaces/Options/Absorbers/IAbsorber";
import { Absorber } from "../Absorber";

/**
 * Particles container event listeners manager
 */
export class EventListeners {
    private readonly container: Container;

    private readonly mouseMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchStartHandler: EventListenerOrEventListenerObject;
    private readonly touchMoveHandler: EventListenerOrEventListenerObject;
    private readonly touchEndHandler: EventListenerOrEventListenerObject;
    private readonly mouseLeaveHandler: EventListenerOrEventListenerObject;
    private readonly touchCancelHandler: EventListenerOrEventListenerObject;
    private readonly touchEndClickHandler: EventListenerOrEventListenerObject;
    private readonly mouseUpHandler: EventListenerOrEventListenerObject;
    private readonly visibilityChangeHandler: EventListenerOrEventListenerObject;
    private readonly resizeHandler: EventListenerOrEventListenerObject;

    private canPush: boolean;

    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(container: Container) {
        this.container = container;
        this.canPush = true;

        this.mouseMoveHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchStartHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchMoveHandler = (e: Event) => this.mouseTouchMove(e);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = (e: Event) => this.mouseTouchClick(e);
        this.mouseUpHandler = (e: Event) => this.mouseTouchClick(e);
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.resizeHandler = () => this.handleWindowResize();
    }

    private static manageListener(element: HTMLElement | Node | Window,
                                  event: string,
                                  handler: EventListenerOrEventListenerObject,
                                  add: boolean,
                                  options?: boolean | AddEventListenerOptions | EventListenerObject): void {
        if (add) {
            let addOptions: AddEventListenerOptions = { passive: true };

            if (typeof options === "boolean") {
                addOptions.capture = options;
            } else if (options !== undefined) {
                addOptions = options as AddEventListenerOptions;
            }

            EventListeners.addListener(element, event, handler, addOptions);
        } else {
            EventListeners.removeListener(element, event, handler,
                options as boolean | EventListenerOptions | undefined);
        }
    }

    private static addListener(element: HTMLElement | Node | Window,
                               event: string,
                               handler: EventListenerOrEventListenerObject,
                               options?: boolean | AddEventListenerOptions | undefined): void {
        element.addEventListener(event, handler, options);
    }

    private static removeListener(element: HTMLElement | Node | Window,
                                  event: string,
                                  handler: EventListenerOrEventListenerObject,
                                  options?: boolean | EventListenerOptions): void {
        element.removeEventListener(event, handler, options);
    }

    /**
     * Initializing event listeners
     */
    public addListeners(): void {
        this.manageListeners(true);
    }

    public removeListeners(): void {
        this.manageListeners(false);
    }

    private manageListeners(add: boolean): void {
        const container = this.container;
        const options = container.options;

        /* events target element */
        if (options.interactivity.detectsOn === InteractivityDetect.window) {
            container.interactivity.element = window;
        } else if (options.interactivity.detectsOn === InteractivityDetect.parent && container.canvas.element) {
            container.interactivity.element = container.canvas.element.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (interactivityEl && (
            options.interactivity.events.onHover.enable ||
            options.interactivity.events.onClick.enable)
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
            EventListeners.manageListener(interactivityEl, Constants.mouseLeaveEvent, this.mouseLeaveHandler, add);

            /* el on touchcancel */
            EventListeners.manageListener(interactivityEl, Constants.touchCancelEvent, this.touchCancelHandler, add);
        }

        /* on click event */
        if (options.interactivity.events.onClick.enable && interactivityEl) {
            EventListeners.manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndClickHandler, add);
            EventListeners.manageListener(interactivityEl, Constants.mouseUpEvent, this.mouseUpHandler, add);
        }

        if (options.interactivity.events.resize) {
            EventListeners.manageListener(window, Constants.resizeEvent, this.resizeHandler, add);
        }

        if (document) {
            EventListeners.manageListener(document,
                Constants.visibilityChangeEvent,
                this.visibilityChangeHandler,
                add,
                false);
        }
    }

    private handleWindowResize(): void {
        const container = this.container;
        const options = container.options;

        if (!container.canvas.element) {
            return;
        }

        container.canvas.size.width = container.canvas.element.offsetWidth;
        container.canvas.size.height = container.canvas.element.offsetHeight;

        /* resize canvas */
        if (container.retina.isRetina) {
            container.canvas.size.width *= container.retina.pixelRatio;
            container.canvas.size.height *= container.retina.pixelRatio;
        }

        container.canvas.element.width = container.canvas.size.width;
        container.canvas.element.height = container.canvas.size.height;

        /* repaint canvas on anim disabled */
        if (!options.particles.move.enable) {
            container.particles.redraw();
        }

        /* density particles enabled */
        container.densityAutoParticles();

        for (const emitter of container.emitters) {
            emitter.resize();
        }

        for (const absorber of container.absorbers) {
            absorber.resize();
        }

        container.polygon.redraw();
    }

    private handleVisibilityChange(): void {
        const container = this.container;
        const options = container.options;

        if (!options.pauseOnBlur) {
            return;
        }

        if (document?.hidden) {
            container.pageHidden = true;

            container.pause();
        } else {
            container.pageHidden = false;

            if (container.getAnimationStatus()) {
                container.lastFrameTime = performance.now();
                container.play();
            }
        }
    }

    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */
    private mouseTouchMove(e: Event): void {
        const container = this.container;
        const options = container.options;

        let pos: ICoordinates | undefined;

        if (e.type.startsWith("mouse")) {
            this.canPush = true;

            const mouseEvent = e as MouseEvent;
            if (container.interactivity?.element === undefined) {
                return;
            }

            if (container.interactivity.element === window) {
                if (container.canvas.element) {
                    const clientRect = container.canvas.element.getBoundingClientRect();

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
            const canvasRect = container.canvas.element?.getBoundingClientRect();

            pos = {
                x: lastTouch.clientX - (canvasRect?.left ?? 0),
                y: lastTouch.clientY - (canvasRect?.top ?? 0),
            };
        }

        container.interactivity.mouse.position = pos;

        if (container.retina.isRetina && container.interactivity.mouse.position) {
            container.interactivity.mouse.position.x *= container.retina.pixelRatio;
            container.interactivity.mouse.position.y *= container.retina.pixelRatio;
        }

        container.interactivity.status = Constants.mouseMoveEvent;
    }

    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish(): void {
        const container = this.container;

        delete container.interactivity.mouse.position;
        container.interactivity.status = Constants.mouseLeaveEvent;
    }

    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (options.polygon === undefined) {
            return;
        }

        if (options.polygon.enable && options.polygon.type !== PolygonMaskType.none &&
            options.polygon.type !== PolygonMaskType.inline) {
            if (container.polygon.checkInsidePolygon(container.interactivity.mouse.position)) {
                this.doMouseTouchClick(e);
            }
        } else {
            this.doMouseTouchClick(e);
        }
    }

    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */
    private doMouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.options;

        if (this.canPush) {
            if (container.interactivity.mouse.position) {
                container.interactivity.mouse.clickPosition = {
                    x: container.interactivity.mouse.position.x,
                    y: container.interactivity.mouse.position.y,
                };
            } else {
                return;
            }

            container.interactivity.mouse.clickTime = new Date().getTime();

            const pushNb = options.interactivity.modes.push.quantity;
            const removeNb = options.interactivity.modes.remove.quantity;

            switch (options.interactivity.events.onClick.mode) {
                case ClickMode.push:
                    if (options.particles.move.enable) {
                        container.particles.push(pushNb, container.interactivity.mouse);
                    } else {
                        if (options.interactivity.modes.push.quantity === 1) {
                            container.particles.push(pushNb, container.interactivity.mouse);
                        } else if (options.interactivity.modes.push.quantity > 1) {
                            container.particles.push(pushNb);
                        }
                    }
                    break;
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
                case ClickMode.absorber:
                    let absorbersModeOptions: IAbsorber | undefined;
                    const modeAbsorbers = options.interactivity.modes.absorbers;

                    if (modeAbsorbers instanceof Array) {
                        if (modeAbsorbers.length > 0) {
                            absorbersModeOptions = Utils.itemFromArray(modeAbsorbers);
                        }
                    } else {
                        absorbersModeOptions = modeAbsorbers;
                    }

                    const absorbersOptions = absorbersModeOptions ?? (options.absorbers instanceof Array ?
                        Utils.itemFromArray(options.absorbers) :
                        options.absorbers);
                    const bhPosition = container.interactivity.mouse.clickPosition;
                    const absorber = new Absorber(container, absorbersOptions, bhPosition);
                    container.absorbers.push(absorber);
                    break;

                case ClickMode.emitter:
                    let emitterModeOptions: IEmitter | undefined;
                    const modeEmitters = options.interactivity.modes.emitters;

                    if (modeEmitters instanceof Array) {
                        if (modeEmitters.length > 0) {
                            emitterModeOptions = Utils.itemFromArray(modeEmitters);
                        }
                    } else {
                        emitterModeOptions = modeEmitters;
                    }

                    const emitterOptions = emitterModeOptions ?? (options.emitters instanceof Array ?
                        Utils.itemFromArray(options.emitters) :
                        options.emitters);
                    const ePosition = container.interactivity.mouse.clickPosition;
                    const emitter = new Emitter(container, Utils.deepExtend({}, emitterOptions), ePosition);

                    container.emitters.push(emitter);
                    break;
            }
        }

        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }
}
