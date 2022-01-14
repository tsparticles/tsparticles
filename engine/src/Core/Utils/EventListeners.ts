import { ClickMode, InteractivityDetect } from "../../Enums";
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
import type { ICoordinates } from "../Interfaces";
import { isSsr } from "../../Utils";

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

/**
 * Particles container event listeners manager
 * @category Utils
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
    private readonly themeChangeHandler: EventListenerOrEventListenerObject;
    private readonly oldThemeChangeHandler: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;
    private readonly resizeHandler: EventListenerOrEventListenerObject;

    private canPush: boolean;
    private resizeTimeout?: NodeJS.Timeout;
    private resizeObserver?: ResizeObserver;

    /**
     * Events listener constructor
     * @param container the calling container
     */
    constructor(private readonly container: Container) {
        this.canPush = true;

        this.mouseMoveHandler = (e): void => this.mouseTouchMove(e);
        this.touchStartHandler = (e): void => this.mouseTouchMove(e);
        this.touchMoveHandler = (e): void => this.mouseTouchMove(e);
        this.touchEndHandler = (): void => this.mouseTouchFinish();
        this.mouseLeaveHandler = (): void => this.mouseTouchFinish();
        this.touchCancelHandler = (): void => this.mouseTouchFinish();
        this.touchEndClickHandler = (e): void => this.mouseTouchClick(e);
        this.mouseUpHandler = (e): void => this.mouseTouchClick(e);
        this.mouseDownHandler = (): void => this.mouseDown();
        this.visibilityChangeHandler = (): void => this.handleVisibilityChange();
        this.themeChangeHandler = (e): void => this.handleThemeChange(e);
        this.oldThemeChangeHandler = (e): void => this.handleThemeChange(e);
        this.resizeHandler = (): void => this.handleWindowResize();
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
     * Initializing event listeners
     */
    private manageListeners(add: boolean): void {
        const container = this.container;
        const options = container.actualOptions;
        const detectType = options.interactivity.detectsOn;
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

        const mediaMatch = !isSsr() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");

        if (mediaMatch) {
            if (mediaMatch.addEventListener !== undefined) {
                manageListener(mediaMatch, "change", this.themeChangeHandler, add);
            } else if (mediaMatch.addListener !== undefined) {
                if (add) {
                    mediaMatch.addListener(this.oldThemeChangeHandler);
                } else {
                    mediaMatch.removeListener(this.oldThemeChangeHandler);
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
            manageListener(interactivityEl, mouseMoveEvent, this.mouseMoveHandler, add);

            /* el on touchstart */
            manageListener(interactivityEl, touchStartEvent, this.touchStartHandler, add);

            /* el on touchmove */
            manageListener(interactivityEl, touchMoveEvent, this.touchMoveHandler, add);

            if (!options.interactivity.events.onClick.enable) {
                /* el on touchend */
                manageListener(interactivityEl, touchEndEvent, this.touchEndHandler, add);
            } else {
                manageListener(interactivityEl, touchEndEvent, this.touchEndClickHandler, add);
                manageListener(interactivityEl, mouseUpEvent, this.mouseUpHandler, add);
                manageListener(interactivityEl, mouseDownEvent, this.mouseDownHandler, add);
            }

            /* el on onmouseleave */
            manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);

            /* el on touchcancel */
            manageListener(interactivityEl, touchCancelEvent, this.touchCancelHandler, add);
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
                manageListener(window, resizeEvent, this.resizeHandler, add);
            }
        }

        if (document) {
            manageListener(document, visibilityChangeEvent, this.visibilityChangeHandler, add, false);
        }
    }

    private handleWindowResize(): void {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);

            delete this.resizeTimeout;
        }

        this.resizeTimeout = setTimeout(async () => await this.container.canvas?.windowResize(), 500);
    }

    private handleVisibilityChange(): void {
        const container = this.container;
        const options = container.actualOptions;

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
        const options = container.actualOptions;

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
                const canvasEl = container.canvas.element;

                if (source && target && canvasEl) {
                    const sourceRect = source.getBoundingClientRect();
                    const targetRect = target.getBoundingClientRect();
                    const canvasRect = canvasEl.getBoundingClientRect();

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
            } else {
                if (mouseEvent.target === container.canvas.element) {
                    pos = {
                        x: mouseEvent.offsetX ?? mouseEvent.clientX,
                        y: mouseEvent.offsetY ?? mouseEvent.clientY,
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
        container.interactivity.status = mouseMoveEvent;
    }

    /**
     * Mouse/Touch event finish
     */
    private mouseTouchFinish(): void {
        const interactivity = this.container.interactivity;

        if (interactivity === undefined) {
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
     * Mouse/Touch click/tap event
     * @param e the click event arguments
     */
    private mouseTouchClick(e: Event): void {
        const container = this.container;
        const options = container.actualOptions;
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
        const options = container.actualOptions;

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

    private handleThemeChange(e: Event): void {
        const mediaEvent = e as MediaQueryListEvent;
        const themeName = mediaEvent.matches
            ? this.container.options.defaultDarkTheme
            : this.container.options.defaultLightTheme;
        const theme = this.container.options.themes.find((theme) => theme.name === themeName);

        if (theme && theme.default.auto) {
            this.container.loadTheme(themeName);
        }
    }

    private handleClickMode(mode: ClickMode | string): void {
        this.container.handleClickMode(mode);
    }
}
