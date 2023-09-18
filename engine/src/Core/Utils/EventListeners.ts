import { executeOnSingleOrMultiple, isBoolean, safeMatchMedia } from "../../Utils/Utils";
import {
    mouseDownEvent,
    mouseLeaveEvent,
    mouseMoveEvent,
    mouseOutEvent,
    mouseUpEvent,
    resizeEvent,
    touchCancelEvent,
    touchEndEvent,
    touchMoveEvent,
    touchStartEvent,
    visibilityChangeEvent,
} from "./Constants";
import type { Container } from "../Container";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import { InteractivityDetect } from "../../Enums/InteractivityDetect";

/**
 * Manage the given event listeners
 * @param element - the event listener receiver
 * @param event - the event to listen
 * @param handler - the handler called once the event is triggered
 * @param add - flag for adding or removing the event listener
 * @param options - event listener options object
 */
function manageListener(
    element: HTMLElement | Node | Window | MediaQueryList,
    event: string,
    handler: EventListenerOrEventListenerObject,
    add: boolean,
    options?: boolean | AddEventListenerOptions | EventListenerObject,
): void {
    if (add) {
        let addOptions: AddEventListenerOptions = { passive: true };

        if (isBoolean(options)) {
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

type EventListenersHandlers = {
    readonly mouseDown: EventListenerOrEventListenerObject;
    readonly mouseLeave: EventListenerOrEventListenerObject;
    readonly mouseMove: EventListenerOrEventListenerObject;
    readonly mouseUp: EventListenerOrEventListenerObject;
    readonly oldThemeChange: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;
    readonly resize: EventListenerOrEventListenerObject;
    readonly themeChange: EventListenerOrEventListenerObject;
    readonly touchCancel: EventListenerOrEventListenerObject;
    readonly touchEnd: EventListenerOrEventListenerObject;
    readonly touchEndClick: EventListenerOrEventListenerObject;
    readonly touchMove: EventListenerOrEventListenerObject;
    readonly touchStart: EventListenerOrEventListenerObject;
    readonly visibilityChange: EventListenerOrEventListenerObject;
};

/**
 * Particles container event listeners manager
 */
export class EventListeners {
    private _canPush: boolean;

    private readonly _handlers: EventListenersHandlers;
    private _resizeObserver?: ResizeObserver;
    private _resizeTimeout?: NodeJS.Timeout;
    private readonly _touches: Map<number, number>;

    /**
     * Events listener constructor
     * @param container - the calling container
     */
    constructor(private readonly container: Container) {
        this._canPush = true;

        this._touches = new Map<number, number>();
        this._handlers = {
            mouseDown: (): void => this._mouseDown(),
            mouseLeave: (): void => this._mouseTouchFinish(),
            mouseMove: (e): void => this._mouseTouchMove(e),
            mouseUp: (e): void => this._mouseTouchClick(e),
            touchStart: (e): void => this._touchStart(e),
            touchMove: (e): void => this._mouseTouchMove(e),
            touchEnd: (e): void => this._touchEnd(e),
            touchCancel: (e: Event): void => this._touchEnd(e),
            touchEndClick: (e): void => this._touchEndClick(e),
            visibilityChange: (): void => this._handleVisibilityChange(),
            themeChange: (e): void => this._handleThemeChange(e),
            oldThemeChange: (e): void => this._handleThemeChange(e),
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
    private readonly _doMouseTouchClick: (e: Event) => void = (e) => {
        const container = this.container,
            options = container.actualOptions;
    
        if (this._canPush) {
            const mouseInteractivity = container.interactivity.mouse,
                mousePos = mouseInteractivity.position;
    
            if (!mousePos) {
                return;
            }
    
            if (e.type === "mousedown") {
                mouseInteractivity.downPosition = { ...mousePos };
                mouseInteractivity.downTime = new Date().getTime();
            } else if (e.type === "mouseup") {
                mouseInteractivity.upPosition = { ...mousePos };
                mouseInteractivity.upTime = new Date().getTime();
            }
    
            const onClick = options.interactivity.events.onClick;
    
            executeOnSingleOrMultiple(onClick.mode, (mode) => this.container.handleClickMode(mode));
        }
    
        if (e.type === "touchend") {
            setTimeout(() => this._mouseTouchFinish(), 500);
        }
    };

    /**
     * Handle browser theme change
     * @param e - the media query event
     * @internal
     */
    private readonly _handleThemeChange: (e: Event) => void = (e) => {
        const mediaEvent = e as MediaQueryListEvent,
            container = this.container,
            options = container.options,
            defaultThemes = options.defaultThemes,
            themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
            theme = options.themes.find((theme) => theme.name === themeName);

        if (theme && theme.default.auto) {
            container.loadTheme(themeName);
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

        if (document && document.hidden) {
            container.pageHidden = true;

            container.pause();
        } else {
            container.pageHidden = false;

            if (container.getAnimationStatus()) {
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
    private readonly _handleWindowResize: () => Promise<void> = async () => {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);

            delete this._resizeTimeout;
        }

        this._resizeTimeout = setTimeout(async () => {
            const canvas = this.container.canvas;

            canvas && (await canvas.windowResize());
        }, this.container.actualOptions.interactivity.events.resize.delay * 1000);
    };

    private readonly _manageInteractivityListeners: (mouseLeaveTmpEvent: string, add: boolean) => void = (
        mouseLeaveTmpEvent,
        add,
    ) => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions;

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (!interactivityEl) {
            return;
        }

        const html = interactivityEl as HTMLElement,
            canvasEl = container.canvas.element;

        if (canvasEl) {
            canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
        }

        if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
            return;
        }

        manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
        manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
        manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);

        if (!options.interactivity.events.onClick.enable) {
            /* el on touchend */
            manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
        } else {
            manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
            manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
            manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
            manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
            manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
        }

        manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
        manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };

    /**
     * Initializing event listeners
     * @param add -
     */
    private readonly _manageListeners: (add: boolean) => void = (add) => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions,
            detectType = options.interactivity.detectsOn,
            canvasEl = container.canvas.element;
        let mouseLeaveTmpEvent = mouseLeaveEvent;

        /* events target element */
        if (detectType === InteractivityDetect.window) {
            container.interactivity.element = window;

            mouseLeaveTmpEvent = mouseOutEvent;
        } else if (detectType === InteractivityDetect.parent && canvasEl) {
            container.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
        } else {
            container.interactivity.element = canvasEl;
        }

        this._manageMediaMatch(add);
        this._manageResize(add);
        this._manageInteractivityListeners(mouseLeaveTmpEvent, add);

        if (document) {
            manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
        }
    };

    private readonly _manageMediaMatch: (add: boolean) => void = (add) => {
        const handlers = this._handlers,
            mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");

        if (!mediaMatch) {
            return;
        }

        if (mediaMatch.addEventListener !== undefined) {
            manageListener(mediaMatch, "change", handlers.themeChange, add);

            return;
        }

        if (mediaMatch.addListener === undefined) {
            return;
        }

        if (add) {
            mediaMatch.addListener(handlers.oldThemeChange);
        } else {
            mediaMatch.removeListener(handlers.oldThemeChange);
        }
    };

    private readonly _manageResize: (add: boolean) => void = (add) => {
        const handlers = this._handlers,
            container = this.container,
            options = container.actualOptions;

        if (!options.interactivity.events.resize) {
            return;
        }

        if (typeof ResizeObserver === "undefined") {
            manageListener(window, resizeEvent, handlers.resize, add);

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
            this._resizeObserver = new ResizeObserver(async (entries) => {
                const entry = entries.find((e) => e.target === canvasEl);

                if (!entry) {
                    return;
                }

                await this._handleWindowResize();
            });

            this._resizeObserver.observe(canvasEl);
        }
    };

    /**
     * Handle mouse down event
     * @internal
     */
    private readonly _mouseDown: () => void = () => {
        const { interactivity } = this.container;

        if (!interactivity) {
            return;
        }

        const { mouse } = interactivity;

        mouse.clicking = true;
        mouse.downPosition = mouse.position;
    };

    /**
     * Mouse/Touch click/tap event
     * @param e - the click event arguments
     */
    private readonly _mouseTouchClick: (e: Event) => void = (e) => {
        const container = this.container,
            options = container.actualOptions,
            { mouse } = container.interactivity;

        mouse.inside = true;

        let handled = false;

        const mousePosition = mouse.position;

        if (!mousePosition || !options.interactivity.events.onClick.enable) {
            return;
        }

        for (const [, plugin] of container.plugins) {
            if (!plugin.clickPositionValid) {
                continue;
            }

            handled = plugin.clickPositionValid(mousePosition);

            if (handled) {
                break;
            }
        }

        if (!handled) {
            private readonly _doMouseTouchClick = (e: Event): void => {
                const container = this.container,
                    options = container.actualOptions,
                    mouse = container.interactivity.mouse,
                    events = options.interactivity.events,
                    pushNb = events.onMouseDown.mode === ClickMode.push ? events.onMouseDown.quantity : 0,
                    pos = mouse.position;
            
                if (!pos) {
                    return;
                }
            
                const radius = (events.onMouseDown.mode === ClickMode.bubble || events.onMouseDown.mode === ClickMode.repulse)
                    ? events.modes.bubble.distance
                    : (events.onMouseDown.mode === ClickMode.attract ? events.modes.attract.distance : pushNb);
            
                if (radius === undefined) {
                    return;
                }
            
                const area = container.retina.bubbleModeDistance;
            
                /* mouse click event */
                const query = container.particles.quadTree.queryCircle(pos, area);
            
                for (const particle of query) {
                    if (events.onMouseDown.mode === ClickMode.push) {
                        container.particles.addParticle(pos, undefined, pushNb);
                    } else if (events.onMouseDown.mode === ClickMode.remove) {
                        container.particles.removeParticle(particle);
                    } else if (events.onMouseDown.mode === ClickMode.bubble) {
                        container.bubble.clicking = true;
                    } else if (events.onMouseDown.mode === ClickMode.repulse) {
                        container.repulse.clicking = true;
                        container.repulse.count = 0;
                        container.repulse.finish = false;
                        setTimeout(() => {
                            if (!container.destroyed) {
                                container.repulse.clicking = false;
                            }
                        }, events.modes.repulse.duration * 1000);
                    } else if (events.onMouseDown.mode === ClickMode.attract) {
                        container.attract.clicking = true;
                        container.attract.count = 0;
                        container.attract.finish = false;
                        setTimeout(() => {
                            if (!container.destroyed) {
                                container.attract.clicking = false;
                            }
                        }, events.modes.attract.duration * 1000);
                    }
                }
            
                if (events.onMouseUp.mode === ClickMode.push) {
                    container.particles.addParticle(pos, undefined, pushNb);
                } else if (events.onMouseUp.mode === ClickMode.remove) {
                    container.particles.removeParticle(particle);
                } else if (events.onMouseUp.mode === ClickMode.bubble) {
                    container.bubble.clicking = false;
                } else if (events.onMouseUp.mode === ClickMode.repulse) {
                    container.repulse.clicking = false;
                } else if (events.onMouseUp.mode === ClickMode.attract) {
                    container.attract.clicking = false;
                }
            };
                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
                const source = mouseEvent.target as HTMLElement,
                    target = mouseEvent.currentTarget as HTMLElement;

                if (source && target && canvasEl) {
                    const sourceRect = source.getBoundingClientRect(),
                        targetRect = target.getBoundingClientRect(),
                        canvasRect = canvasEl.getBoundingClientRect();

                    pos = {
                        x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                        y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                    };
                } else {
                    pos = {
                        x: mouseEvent.offsetX ?? mouseEvent.clientX,
                        y: mouseEvent.offsetY ?? mouseEvent.clientY,
                    };
                }
            } else if (mouseEvent.target === canvasEl) {
                pos = {
                    x: mouseEvent.offsetX ?? mouseEvent.clientX,
                    y: mouseEvent.offsetY ?? mouseEvent.clientY,
                };
            }
        } else {
            this._canPush = e.type !== "touchmove";

            if (canvasEl) {
                const touchEvent = e as TouchEvent,
                    lastTouch = touchEvent.touches[touchEvent.touches.length - 1],
                    canvasRect = canvasEl.getBoundingClientRect();

                pos = {
                    x: lastTouch.clientX - (canvasRect.left ?? 0),
                    y: lastTouch.clientY - (canvasRect.top ?? 0),
                };
            }
        }

        const pxRatio = container.retina.pixelRatio;

        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }

        interactivity.mouse.position = pos;
        private readonly _manageInteractivityListeners = (): void => {
            const container = this.container,
                options = container.actualOptions,
                detectType = options.interactivity.detectsOn,
                mouseLeaveEvent = Constants.mouseLeaveEvent,
                mouseDownEvent = Constants.mouseDownEvent,
                mouseUpEvent = Constants.mouseUpEvent,
                resizeEvent = Constants.resizeEvent,
                visibilityChangeEvent = Constants.visibilityChangeEvent,
                touchStartEvent = Constants.touchStartEvent,
                touchMoveEvent = Constants.touchMoveEvent,
                touchEndEvent = Constants.touchEndEvent,
                touchCancelEvent = Constants.touchCancelEvent,
                touchEndClickEvent = Constants.touchEndClickEvent,
                mouseMoveEvent = Constants.mouseMoveEvent,
                mouseDownEvent = Constants.mouseDownEvent,
                mouseUpEvent = Constants.mouseUpEvent;