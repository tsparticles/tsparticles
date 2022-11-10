import { executeOnSingleOrMultiple, safeMatchMedia } from "../../Utils/Utils";
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
import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import type { ICoordinates } from "../Interfaces/ICoordinates";
import { InteractivityDetect } from "../../Enums/InteractivityDetect";

/**
 * Manage the given event listeners
 * @param element the event listener receiver
 * @param event the event to listen
 * @param handler the handler called once the event is triggered
 * @param add flag for adding or removing the event listener
 * @param options event listener options object
 */
function manageListener(
    element: HTMLElement | Node | Window | MediaQueryList,
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
 * @category Utils
 */
export class EventListeners {
    private canPush: boolean;

    private readonly handlers: EventListenersHandlers;
    private resizeObserver?: ResizeObserver;
    private resizeTimeout?: NodeJS.Timeout;

    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(private readonly container: Container) {
        this.canPush = true;

        this.handlers = {
            mouseMove: (e): void => this.mouseTouchMove(e),
            touchStart: (e): void => this.mouseTouchMove(e),
            touchMove: (e): void => this.mouseTouchMove(e),
            touchEnd: (): void => this.mouseTouchFinish(),
            mouseLeave: (): void => this.mouseTouchFinish(),
            touchCancel: (): void => this.mouseTouchFinish(),
            touchEndClick: (e): void => this.mouseTouchClick(e),
            mouseUp: (e): void => this.mouseTouchClick(e),
            mouseDown: (): void => this.mouseDown(),
            visibilityChange: (): void => this.handleVisibilityChange(),
            themeChange: (e): void => this.handleThemeChange(e),
            oldThemeChange: (e): void => this.handleThemeChange(e),
            resize: (): void => this.handleWindowResize(),
        };
    }

    /**
     * Adding all listeners
     */
    addListeners(): void {
        this.manageListeners(true);
    }

    /**
     * Removing all listeners
     */
    removeListeners(): void {
        this.manageListeners(false);
    }

    /**
     * Mouse/Touch click/tap event implementation
     * @param e the click event arguments
     */
    private doMouseTouchClick(e: Event): void {
        const container = this.container,
            options = container.actualOptions;

        if (this.canPush) {
            const mouseInteractivity = container.interactivity.mouse,
                mousePos = mouseInteractivity.position;

            if (!mousePos) {
                return;
            }

            mouseInteractivity.clickPosition = { ...mousePos };
            mouseInteractivity.clickTime = new Date().getTime();

            const onClick = options.interactivity.events.onClick;

            executeOnSingleOrMultiple(onClick.mode, (mode) => this.handleClickMode(mode));
        }

        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }

    /**
     * Handles click mode event
     * @param mode Click mode type
     * @private
     */
    private handleClickMode(mode: ClickMode | string): void {
        this.container.handleClickMode(mode);
    }

    /**
     * Handle browser theme change
     * @param e the media query event
     * @private
     */
    private handleThemeChange(e: Event): void {
        const mediaEvent = e as MediaQueryListEvent,
            container = this.container,
            options = container.options,
            defaultThemes = options.defaultThemes,
            themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
            theme = options.themes.find((theme) => theme.name === themeName);

        if (theme && theme.default.auto) {
            container.loadTheme(themeName);
        }
    }

    /**
     * Handles blur event
     * @private
     */
    private handleVisibilityChange(): void {
        const container = this.container,
            options = container.actualOptions;

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
                container.draw(true);
            }
        }
    }

    /**
     * Handles window resize event
     * @private
     */
    private handleWindowResize(): void {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);

            delete this.resizeTimeout;
        }

        this.resizeTimeout = setTimeout(
            async () => this.container.canvas?.windowResize(),
            this.container.actualOptions.interactivity.events.resize.delay * 1000
        );
    }

    /**
     * Initializing event listeners
     */
    private manageListeners(add: boolean): void {
        const handlers = this.handlers,
            container = this.container,
            options = container.actualOptions,
            detectType = options.interactivity.detectsOn;
        let mouseLeaveTmpEvent = mouseLeaveEvent;

        /* events target element */
        if (detectType === InteractivityDetect.window) {
            container.interactivity.element = window;

            mouseLeaveTmpEvent = mouseOutEvent;
        } else if (detectType === InteractivityDetect.parent && container.canvas.element) {
            const canvasEl = container.canvas.element;

            container.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
        } else {
            container.interactivity.element = container.canvas.element;
        }

        const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");

        if (mediaMatch) {
            if (mediaMatch.addEventListener !== undefined) {
                manageListener(mediaMatch, "change", handlers.themeChange, add);
            } else if (mediaMatch.addListener !== undefined) {
                if (add) {
                    mediaMatch.addListener(handlers.oldThemeChange);
                } else {
                    mediaMatch.removeListener(handlers.oldThemeChange);
                }
            }
        }

        const interactivityEl = container.interactivity.element;

        /* detect mouse pos - on hover / click event */
        if (!interactivityEl) {
            return;
        }

        const html = interactivityEl as HTMLElement;

        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            /* el on mousemove */
            manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);

            /* el on touchstart */
            manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);

            /* el on touchmove */
            manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);

            if (!options.interactivity.events.onClick.enable) {
                /* el on touchend */
                manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
            } else {
                manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
                manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
                manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
            }

            /* el on onmouseleave */
            manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);

            /* el on touchcancel */
            manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
        }

        if (container.canvas.element) {
            container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
        }

        if (options.interactivity.events.resize) {
            if (typeof ResizeObserver !== "undefined") {
                if (this.resizeObserver && !add) {
                    if (container.canvas.element) {
                        this.resizeObserver.unobserve(container.canvas.element);
                    }

                    this.resizeObserver.disconnect();

                    delete this.resizeObserver;
                } else if (!this.resizeObserver && add && container.canvas.element) {
                    this.resizeObserver = new ResizeObserver((entries) => {
                        const entry = entries.find((e) => e.target === container.canvas.element);

                        if (!entry) {
                            return;
                        }

                        this.handleWindowResize();
                    });

                    this.resizeObserver.observe(container.canvas.element);
                }
            } else {
                manageListener(window, resizeEvent, handlers.resize, add);
            }
        }

        if (document) {
            manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
        }
    }

    /**
     * Handle mouse down event
     * @private
     */
    private mouseDown(): void {
        const interactivity = this.container.interactivity;

        if (interactivity) {
            const mouse = interactivity.mouse;

            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        }
    }

    /**
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick(e: Event): void {
        const container = this.container,
            options = container.actualOptions,
            mouse = container.interactivity.mouse;

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
            this.doMouseTouchClick(e);
        }

        mouse.clicking = false;
    }

    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish(): void {
        const interactivity = this.container.interactivity;

        if (!interactivity) {
            return;
        }

        const mouse = interactivity.mouse;

        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;

        interactivity.status = mouseLeaveEvent;
        mouse.inside = false;
        mouse.clicking = false;
    }

    /**
     * Mouse/Touch move event
     * @param e the event arguments
     */
    private mouseTouchMove(e: Event): void {
        const container = this.container,
            options = container.actualOptions;

        if (!container.interactivity?.element) {
            return;
        }

        container.interactivity.mouse.inside = true;

        let pos: ICoordinates | undefined;

        const canvas = container.canvas.element;

        if (e.type.startsWith("pointer")) {
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
                const source = mouseEvent.target as HTMLElement,
                    target = mouseEvent.currentTarget as HTMLElement,
                    canvasEl = container.canvas.element;

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
            } else if (mouseEvent.target === container.canvas.element) {
                pos = {
                    x: mouseEvent.offsetX ?? mouseEvent.clientX,
                    y: mouseEvent.offsetY ?? mouseEvent.clientY,
                };
            }
        } else {
            this.canPush = e.type !== "touchmove";

            const touchEvent = e as TouchEvent,
                lastTouch = touchEvent.touches[touchEvent.touches.length - 1],
                canvasRect = canvas?.getBoundingClientRect();

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
        container.interactivity.status = mouseMoveEvent;
    }
}
