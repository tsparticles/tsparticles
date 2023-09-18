private readonly _touchStart: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, { startTime: performance.now(), position: { x: touch.clientX, y: touch.clientY } });
        }

        this._mouseTouchMove(e);
    };

    private readonly _touchEnd: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchFinish();
    };

    private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const container = this.container,
            options = container.actualOptions,
            interactivity = container.interactivity,
            canvasEl = container.canvas.element;

        if (!interactivity || !interactivity.element) {
            return;
        }

        interactivity.mouse.inside = true;

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
                    touches = Array.from(touchEvent.touches);

                for (const touch of touches) {
                    const touchData = this._touches.get(touch.identifier);
                    if (touchData) {
                        touchData.position = {
                            x: touch.clientX - (canvasRect.left ?? 0),
                            y: touch.clientY - (canvasRect.top ?? 0),
                        };
                    }
                }
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

    private readonly _handleMultiTouch: () => void = () => {
        for (const touchData of this._touches.values()) {
            // Apply the appropriate interaction for each touch event
        }
    };

    private readonly _mouseTouchClick: (e: Event) => void = (e) => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    private readonly _mouseTouchFinish: () => void = () => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

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
    readonly handleMultiTouch: () => void;
};

/**
 * Particles container event listeners manager
 */

export class EventListeners {
    private _canPush: boolean;

    private readonly _handlers: EventListenersHandlers;
    private _resizeObserver?: ResizeObserver;
    private _resizeTimeout?: NodeJS.Timeout;
    private readonly _touches: Map<number, { startTime: number, position: ICoordinates }>;

    /**
     * Events listener constructor
     * @param container - the calling container
     */
    constructor(private readonly container: Container) {
        this._canPush = true;

        this._touches = new Map<number, { startTime: number, position: ICoordinates }>();
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
    private readonly _mouseTouchClick: (e: Event) => void = (e) => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    /**
     * Mouse/Touch event finish
     */
    private readonly _mouseTouchFinish: () => void = () => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    /**
     * Mouse/Touch move event
     * @param e - the event arguments
     */
    private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                touchData.position = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }

        // Rest of the function implementation
    };

    private readonly _touchEnd: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchFinish();
    };

    private readonly _touchStart: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, { startTime: performance.now(), position: { x: touch.clientX, y: touch.clientY } });
        }

        this._mouseTouchMove(e);
    };

    private readonly _handleMultiTouch: () => void = () => {
        for (const touchData of this._touches.values()) {
            // Apply the appropriate interaction for each touch event
        }
    };
}

*/
    private readonly _doMouseTouchClick: (e: Event) => void = (e) => {
        this._handleMultiTouch();
        const container = this.container,
            options = container.actualOptions;

        if (this._canPush) {
            const mouseInteractivity = container.interactivity.mouse,
                mousePos = mouseInteractivity.position;

            if (!mousePos) {
                return;
            }

            mouseInteractivity.clickPosition = { ...mousePos };
            mouseInteractivity.clickTime = new Date().getTime();

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

    private readonly _touchStart: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, { startTime: performance.now(), position: { x: touch.clientX, y: touch.clientY } });
        }

        this._mouseTouchMove(e);
    };

    private readonly _touchEnd: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchFinish();
    };

    private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                touchData.position = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
    };

    private readonly _handleMultiTouch: () => void = () => {
        for (const touchData of this._touches.values()) {
            // Apply the appropriate interaction for each touch event
        }
    };

    private readonly _mouseTouchClick: (e: Event) => void = (e) => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    private readonly _mouseTouchFinish: () => void = () => {
        this._handleMultiTouch();
        // Rest of the function implementation
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
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    /**
     * Mouse/Touch event finish
     */
    private readonly _mouseTouchFinish: () => void = () => {
        this._handleMultiTouch();
        // Rest of the function implementation
    };

    /**
     * Mouse/Touch move event
     * @param e - the event arguments
     */
    private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                touchData.position = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
    };

    private readonly _touchEnd: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchFinish();
    };

    private readonly _touchStart: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, { startTime: performance.now(), position: { x: touch.clientX, y: touch.clientY } });
        }

        this._mouseTouchMove(e);
    };

    private readonly _handleMultiTouch: () => void = () => {
        for (const touchData of this._touches.values()) {
            // Apply the appropriate interaction for each touch event
        }
    };

private readonly _mouseTouchClick: (e: Event) => void = (e) => {
        this._handleMultiTouch();
        const container = this.container,
            options = container.actualOptions;

        if (this._canPush) {
            const mouseInteractivity = container.interactivity.mouse,
                mousePos = mouseInteractivity.position;

            if (!mousePos) {
                return;
            }

            mouseInteractivity.clickPosition = { ...mousePos };
            mouseInteractivity.clickTime = new Date().getTime();

            const onClick = options.interactivity.events.onClick;

            executeOnSingleOrMultiple(onClick.mode, (mode) => this.container.handleClickMode(mode));
        }

        if (e.type === "touchend") {
            setTimeout(() => this._mouseTouchFinish(), 500);
        }
    };

    /**
     * Mouse/Touch event finish
     */
    private readonly _mouseTouchFinish: () => void = () => {
        this._handleMultiTouch();
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
    };

    /**
     * Mouse/Touch move event
     * @param e - the event arguments
     */
    private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                touchData.position = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
    };

private readonly _mouseTouchMove: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                touchData.position = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
    };

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
                    touches = Array.from(touchEvent.changedTouches);

                for (const touch of touches) {
                    const touchData = this._touches.get(touch.identifier);
                    if (touchData) {
                        touchData.position = {
                            x: touch.clientX - (canvasRect.left ?? 0),
                            y: touch.clientY - (canvasRect.top ?? 0),
                        };
                    }
                }
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

    private readonly _touchEnd: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchFinish();
    };

    private readonly _touchEndClick: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            const touchData = this._touches.get(touch.identifier);
            if (touchData) {
                const duration = performance.now() - touchData.startTime;
                if (duration < 300) {
                    // This was a tap
                } else {
                    // This was a long tap or a movement
                }
                this._touches.delete(touch.identifier);
            }
        }

        this._mouseTouchClick(e);
    };

    private readonly _touchStart: (e: Event) => void = (e) => {
        const evt = e as TouchEvent,
            touches = Array.from(evt.changedTouches);

        for (const touch of touches) {
            this._touches.set(touch.identifier, { startTime: performance.now(), position: { x: touch.clientX, y: touch.clientY } });
        }

        this._mouseTouchMove(e);
    };
