import { defaultZoom, manageListener, safeDocument } from "@tsparticles/engine";
import {
  initialTouchDistance,
  touchCenterDivisor,
  touchPointIndexFirst,
  touchPointIndexSecond,
  touchPointsCount,
  zoomGestureFactor,
  zoomInFactor,
  zoomOutFactor,
} from "./Utils/Constants.js";
import type { ZoomContainer } from "./types.js";

interface ZoomEventListenersHandlers {
  readonly gestureChange: EventListenerOrEventListenerObject;
  readonly gestureEnd: EventListenerOrEventListenerObject;
  readonly gestureStart: EventListenerOrEventListenerObject;
  readonly touchEnd: EventListenerOrEventListenerObject;
  readonly touchMove: EventListenerOrEventListenerObject;
  readonly wheel: EventListenerOrEventListenerObject;
}

/**
 * Zoom event listeners manager
 */
export class ZoomEventListeners {
  readonly #container: ZoomContainer;
  #gestureScale: number;
  readonly #handlers: ZoomEventListenersHandlers;
  #touchDistance: number;

  /**
   * Zoom events listener constructor
   * @param container - the calling container
   */
  constructor(container: ZoomContainer) {
    this.#container = container;
    this.#gestureScale = defaultZoom;
    this.#touchDistance = initialTouchDistance;
    this.#handlers = {
      gestureStart: (e: Event): void => {
        this.#handleGestureStart(e);
      },
      gestureChange: (e: Event): void => {
        this.#handleGestureChange(e);
      },
      gestureEnd: (e: Event): void => {
        this.#handleGestureEnd(e);
      },
      wheel: (e: Event): void => {
        this.#handleMouseWheel(e as WheelEvent);
      },
      touchMove: (e: Event): void => {
        this.#handleTouchZoom(e as TouchEvent);
      },
      touchEnd: (): void => {
        this.#handleTouchEnd();
      },
    };
  }

  /**
   * Adding zoom listeners
   */
  addListeners(): void {
    this.#manageListeners(true);
  }

  /**
   * Removing zoom listeners
   */
  removeListeners(): void {
    this.#manageListeners(false);
  }

  /**
   * Handles trackpad gesture change event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  readonly #handleGestureChange = (event: Event): void => {
    const container = this.#container,
      canvas = container.canvas as {
        domElement?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.domElement;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this.#isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    const gestureEvent = event as unknown as { clientX?: number; clientY?: number; scale?: number },
      baseZoom = defaultZoom,
      gestureFactor = zoomGestureFactor,
      scale = gestureEvent.scale ?? baseZoom;

    if (scale === this.#gestureScale) {
      return;
    }

    const scaleDelta = scale / this.#gestureScale,
      adjustedScale = baseZoom + (scaleDelta - baseZoom) * gestureFactor,
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * adjustedScale, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      clientX = gestureEvent.clientX ?? rect.left + rect.width / touchCenterDivisor,
      clientY = gestureEvent.clientY ?? rect.top + rect.height / touchCenterDivisor,
      pixelRatio = this.#container.retina.pixelRatio,
      centerX = (clientX - rect.left) * pixelRatio,
      centerY = (clientY - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: centerX, y: centerY });

    this.#gestureScale = scale;
  };

  /**
   * Handles trackpad gesture end event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  readonly #handleGestureEnd = (event: Event): void => {
    const container = this.#container,
      canvas = container.canvas as {
        domElement?: HTMLCanvasElement;
      },
      canvasEl = canvas.domElement;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this.#isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    this.#gestureScale = defaultZoom;
  };

  /**
   * Handles trackpad gesture start event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  readonly #handleGestureStart = (event: Event): void => {
    const container = this.#container,
      canvas = container.canvas as {
        domElement?: HTMLCanvasElement;
      },
      canvasEl = canvas.domElement;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this.#isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    this.#gestureScale = defaultZoom;
  };

  /**
   * Handles mouse wheel zoom event
   * @internal
   * @param event - the wheel event
   */
  readonly #handleMouseWheel = (event: WheelEvent): void => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    const container = this.#container,
      zoomOptions = container.actualOptions.zoom,
      canvas = container.canvas as {
        domElement?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.domElement;

    if (!canvasEl) {
      return;
    }

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this.#isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    const zoomFactor = event.deltaY > initialTouchDistance ? (zoomOutFactor as number) : (zoomInFactor as number),
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * zoomFactor, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      pixelRatio = this.#container.retina.pixelRatio,
      mouseX = (event.clientX - rect.left) * pixelRatio,
      mouseY = (event.clientY - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: mouseX, y: mouseY });
  };

  /**
   * Handles touch end and touch cancel events to reset touch distance
   * @internal
   * @param event - the touch event
   */
  readonly #handleTouchEnd = (): void => {
    this.#touchDistance = initialTouchDistance;
  };

  /**
   * Handles touch pinch to zoom event
   * @internal
   * @param event - the touch event
   */
  readonly #handleTouchZoom = (event: TouchEvent): void => {
    if (event.touches.length !== touchPointsCount) {
      return;
    }

    event.preventDefault();

    const touch1 = event.touches[touchPointIndexFirst as number],
      touch2 = event.touches[touchPointIndexSecond as number];

    if (!touch1 || !touch2) {
      return;
    }

    const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);

    if (this.#touchDistance === initialTouchDistance) {
      this.#touchDistance = distance;
      return;
    }

    const container = this.#container,
      zoomOptions = container.actualOptions.zoom,
      canvas = container.canvas as {
        domElement?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.domElement;

    if (!canvasEl) {
      return;
    }

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this.#isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    const scale = distance / this.#touchDistance,
      baseZoom = defaultZoom,
      gestureFactor = zoomGestureFactor,
      adjustedScale = baseZoom + (scale - baseZoom) * gestureFactor,
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * adjustedScale, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      pixelRatio = this.#container.retina.pixelRatio,
      centerX = ((touch1.clientX + touch2.clientX) / touchCenterDivisor - rect.left) * pixelRatio,
      centerY = ((touch1.clientY + touch2.clientY) / touchCenterDivisor - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: centerX, y: centerY });

    this.#touchDistance = distance;
  };

  /**
   * Check if event is inside canvas bounds
   * @internal
   * @param event - the event to check
   * @param canvasEl - the canvas element
   * @returns true if event is inside canvas
   */
  readonly #isEventInsideCanvas = (event: Event, canvasEl: HTMLCanvasElement): boolean => {
    if (event.target === canvasEl) {
      return true;
    }

    const eventWithPath = event as Event & {
        clientX?: number;
        clientY?: number;
        composedPath: () => EventTarget[];
      },
      path = eventWithPath.composedPath();

    if (path.includes(canvasEl)) {
      return true;
    }

    const { clientX, clientY } = eventWithPath;

    if (typeof clientX === "number" && typeof clientY === "number") {
      const rect = canvasEl.getBoundingClientRect();

      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    }

    return false;
  };

  /**
   * Managing zoom event listeners
   * @param add - true to add listeners, false to remove
   */
  readonly #manageListeners: (add: boolean) => void = add => {
    const handlers = this.#handlers,
      canvas = this.#container.canvas.domElement,
      options = this.#container.actualOptions,
      doc = safeDocument();

    if (!canvas) {
      return;
    }

    if (add && !options.zoom?.enable) {
      return;
    }

    const listenerOptions: AddEventListenerOptions = { passive: false },
      captureOptions: AddEventListenerOptions = { capture: true, passive: false };

    manageListener(doc, "gesturestart", handlers.gestureStart, add, captureOptions);
    manageListener(doc, "gesturechange", handlers.gestureChange, add, captureOptions);
    manageListener(doc, "gestureend", handlers.gestureEnd, add, captureOptions);
    manageListener(doc, "wheel", handlers.wheel, add, captureOptions);

    manageListener(canvas, "gesturestart", handlers.gestureStart, add, listenerOptions);
    manageListener(canvas, "gesturechange", handlers.gestureChange, add, listenerOptions);
    manageListener(canvas, "gestureend", handlers.gestureEnd, add, listenerOptions);
    manageListener(canvas, "wheel", handlers.wheel, add, listenerOptions);
    manageListener(canvas, "touchmove", handlers.touchMove, add, listenerOptions);
    manageListener(canvas, "touchend", handlers.touchEnd, add, listenerOptions);
    manageListener(canvas, "touchcancel", handlers.touchEnd, add, listenerOptions);
  };
}
