import {
    double,
    lengthOffset,
    millisecondsToSeconds,
    mouseDownEvent,
    mouseLeaveEvent,
    mouseMoveEvent,
    mouseOutEvent,
    mouseUpEvent,
    resizeEvent,
    touchCancelEvent,
    touchDelay,
    touchEndEvent,
    touchMoveEvent,
    touchStartEvent,
    visibilityChangeEvent,
} from "./Constants.js";
import { executeOnSingleOrMultiple, manageListener, safeDocument } from "../../Utils/Utils.js";
import type { Container } from "../Container.js";
import type { ICoordinates } from "../Interfaces/ICoordinates.js";
import { InteractivityDetect } from "../../Enums/InteractivityDetect.js";

interface EventListenersHandlers {
    readonly mouseDown: EventListenerOrEventListenerObject;
    readonly mouseLeave: EventListenerOrEventListenerObject;
    readonly mouseMove: EventListenerOrEventListenerObject;
    readonly mouseUp: EventListenerOrEventListenerObject;
    readonly resize: EventListenerOrEventListenerObject;
    readonly touchCancel: EventListenerOrEventListenerObject;
    readonly touchEnd: EventListenerOrEventListenerObject;
    readonly touchEndClick: EventListenerOrEventListenerObject;
    readonly touchMove: EventListenerOrEventListenerObject;
    readonly touchStart: EventListenerOrEventListenerObject;
    readonly visibilityChange: EventListenerOrEventListenerObject;
}

/**
 * Particles container event listeners manager
 */
export class EventListeners {
    private _canPush = true;
    private readonly _handlers: EventListenersHandlers;
    private _resizeObserver?: ResizeObserver;
    private _resizeTimeout?: NodeJS.Timeout;
    private readonly _touches: Map<number, number>;

    /**
     * Events listener constructor
     * @param container - the calling container
     */
    constructor(private readonly container: Container) {
        this._touches = new Map<number, number>();
        this._handlers = {
            mouseDown: (): void => {
                this._mouseDown();
            },
            mouseLeave: (): void => {
                this._mouseTouchFinish();
            },
            mouseMove: (e): void => {
                this._mouseTouchMove(e);
            },
            mouseUp: (e): void => {
                this._mouseTouchClick(e);
            },
            touchStart: (e): void => {
                this._touchStart(e);
            },
            touchMove: (e): void => {
                this._mouseTouchMove(e);
            },
            touchEnd: (e): void => {
                this._touchEnd(e);
            },
            touchCancel: (e: Event): void => {
                this._touchEnd(e);
            },
            touchEndClick: (e): void => {
                this._touchEndClick(e);
            },
            visibilityChange: (): void => {
                this._handleVisibilityChange();
            },
            resize: (): void => {
                this._handleWindowResize();
            },
        };
    }

    /**
     * Adding all listeners
     */
    addListeners(): void {
        this._manageListeners(true);
    }

    /**
     * Removing all listeners
     */
    removeListeners(): void {
        this._manageListeners(false);
    }

    /**
     * Mouse/Touch click/tap event implementation
     * @param e - the click event arguments
     */
    private readonly _doMouseTouchClick: (e: Event) => void = e => {
        const container = this.container,
            options = container.actualOptions;

        if (this._canPush) {
            const mouseInteractivity = container.interactionManager.interactivityData.mouse,
                mousePos = mouseInteractivity.position;

            if (!mousePos) {
                return;
            }

            mouseInteractivity.clickPosition = { ...mousePos };
            mouseInteractivity.clickTime = Date.now();

            const onClick = options.interactivity.events.onClick;

            executeOnSingleOrMultiple(onClick.mode, mode => {
                this.container.handleClickMode(mode);
            });
        }

        if (e.type === "touchend") {
            setTimeout(() => {
                this._mouseTouchFinish();
            }, touchDelay);
        }
    };

    /**
     * Handles blur event
     * @internal
     */
    private readonly _handleVisibilityChange: () => void = () => {
        const container = this.container,
            options = container.actualOptions;

        this._mouseTouchFinish();

        if (!options.pauseOnBlur) {
            return;
        }

        if (safeDocument().hidden) {
            container.pageHidden = true;

            container.pause();
        } else {
            container.pageHidden = false;

            if (container.animationStatus) {
                container.play(true);
            } else {
                container.draw(true);
            }
        }
    };

    /**
     * Handles window resize event
     * @internal
     */
    private readonly _handleWindowResize = (): void => {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);

            delete this._resizeTimeout;
        }

        const handleResize = async (): Promise<void> => {
            const canvas = this.container.canvas;

            await canvas.windowResize();
        };

        this._resizeTimeout = setTimeout(
            () => void handleResize(),
            this.container.actualOptions.resize.delay * millisecondsToSeconds,
        );
    };

    private readonly _manageInteractivityListeners: (mouseLeaveTmpEvent: string, add: boolean) => void = (
        mouseLeaveTmpEvent,
        add,
    ) => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions,
            interactivityEl = container.interactionManager.interactivityData.element;

        /* detect mouse pos - on hover / click event */
        if (!interactivityEl) {
            return;
        }

        const html = interactivityEl as HTMLElement,
            canvas = container.canvas;

        canvas.setPointerEvents(html === canvas.element ? "initial" : "none");

        if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
            return;
        }

        manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
        manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
        manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);

        if (options.interactivity.events.onClick.enable) {
            manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
            manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
            manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
        } else {
            /* el on touchend */
            manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
        }

        manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
        manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };

    /**
     * Initializing event listeners
     * @param add -
     */
    private readonly _manageListeners: (add: boolean) => void = add => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions,
            detectType = options.interactivity.detectsOn,
            canvasEl = container.canvas.element;

        let mouseLeaveTmpEvent = mouseLeaveEvent;

        /* events target element */
        if (detectType === InteractivityDetect.window) {
            container.interactionManager.interactivityData.element = window;

            mouseLeaveTmpEvent = mouseOutEvent;
        } else if (detectType === InteractivityDetect.parent && canvasEl) {
            container.interactionManager.interactivityData.element = canvasEl.parentElement ?? canvasEl.parentNode;
        } else {
            container.interactionManager.interactivityData.element = canvasEl;
        }

        this._manageResize(add);
        this._manageInteractivityListeners(mouseLeaveTmpEvent, add);

        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
    };

    private readonly _manageResize: (add: boolean) => void = add => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions;

        if (!options.resize.enable) {
            return;
        }

        if (typeof ResizeObserver === "undefined") {
            manageListener(globalThis, resizeEvent, handlers.resize, add);

            return;
        }

        const canvasEl = container.canvas.element;

        if (this._resizeObserver && !add) {
            if (canvasEl) {
                this._resizeObserver.unobserve(canvasEl);
            }

            this._resizeObserver.disconnect();

            delete this._resizeObserver;
        } else if (!this._resizeObserver && add && canvasEl) {
            this._resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]): void => {
                const entry = entries.find(e => e.target === canvasEl);

                if (!entry) {
                    return;
                }

                this._handleWindowResize();
            });

            this._resizeObserver.observe(canvasEl);
        }
    };

    /**
     * Handle mouse down event
     * @internal
     */
    private readonly _mouseDown: () => void = () => {
        const { interactivityData } = this.container.interactionManager,
            { mouse } = interactivityData;

        mouse.clicking = true;
        mouse.downPosition = mouse.position;
    };

    /**
     * Mouse/Touch click/tap event
     * @param e - the click event arguments
     */
    private readonly _mouseTouchClick: (e: Event) => void = e => {
        const container = this.container,
            options = container.actualOptions,
            { mouse } = container.interactionManager.interactivityData;

        mouse.inside = true;

        let handled = false;

        const mousePosition = mouse.position;

        if (!mousePosition || !options.interactivity.events.onClick.enable) {
            return;
        }

        for (const plugin of container.plugins.values()) {
            if (!plugin.clickPositionValid) {
                continue;
            }

            handled = plugin.clickPositionValid(mousePosition);

            if (handled) {
                break;
            }
        }

        if (!handled) {
            this._doMouseTouchClick(e);
        }

        mouse.clicking = false;
    };

    /**
     * Mouse/Touch event finish
     */
    private readonly _mouseTouchFinish: () => void = () => {
        const { interactivityData } = this.container.interactionManager,
            { mouse } = interactivityData;

        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;

        interactivityData.status = mouseLeaveEvent;

        mouse.inside = false;
        mouse.clicking = false;
    };

    /**
     * Mouse/Touch move event
     * @param e - the event arguments
     */
    private readonly _mouseTouchMove: (e: Event) => void = e => {
        const container = this.container,
            options = container.actualOptions,
            interactivity = container.interactionManager.interactivityData,
            canvasEl = container.canvas.element;

        if (!interactivity.element) {
            return;
        }

        interactivity.mouse.inside = true;

        let pos: ICoordinates | undefined;

        if (e.type.startsWith("pointer")) {
            this._canPush = true;

            const mouseEvent = e as MouseEvent;

            if (interactivity.element === window) {
                if (canvasEl) {
                    const clientRect = canvasEl.getBoundingClientRect();

                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
                const source = mouseEvent.target as HTMLElement,
                    target = mouseEvent.currentTarget as HTMLElement;

                if (canvasEl) {
                    const sourceRect = source.getBoundingClientRect(),
                        targetRect = target.getBoundingClientRect(),
                        canvasRect = canvasEl.getBoundingClientRect();

                    pos = {
                        x: mouseEvent.offsetX + double * sourceRect.left - (targetRect.left + canvasRect.left),
                        y: mouseEvent.offsetY + double * sourceRect.top - (targetRect.top + canvasRect.top),
                    };
                } else {
                    pos = {
                        x: mouseEvent.offsetX,
                        y: mouseEvent.offsetY,
                    };
                }
            } else if (mouseEvent.target === canvasEl) {
                pos = {
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY,
                };
            }
        } else {
            this._canPush = e.type !== "touchmove";

            if (canvasEl) {
                const touchEvent = e as TouchEvent,
                    lastTouch = touchEvent.touches[touchEvent.touches.length - lengthOffset],
                    canvasRect = canvasEl.getBoundingClientRect();

                if (!lastTouch) {
                    return;
                }

                pos = {
                    x: lastTouch.clientX - canvasRect.left,
                    y: lastTouch.clientY - canvasRect.top,
                };
            }
        }

        const pxRatio = container.retina.pixelRatio;

        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }

        interactivity.mouse.position = pos;
        interactivity.status = mouseMoveEvent;
    };

    private readonly _touchEnd: (e: Event) => void = e => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.delete(touch.identifier);
        }

        this._mouseTouchFinish();
    };

    private readonly _touchEndClick: (e: Event) => void = e => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.delete(touch.identifier);
        }

        this._mouseTouchClick(e);
    };

    private readonly _touchStart: (e: Event) => void = e => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, performance.now());
        }

        this._mouseTouchMove(e);
    };
}
