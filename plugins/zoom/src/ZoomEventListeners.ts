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
  private _gestureScale: number;
  private readonly _handlers: ZoomEventListenersHandlers;
  private _touchDistance: number;

  /**
   * Zoom events listener constructor
   * @param container - the calling container
   */
  constructor(private readonly container: ZoomContainer) {
    this._gestureScale = defaultZoom as number;
    this._touchDistance = initialTouchDistance as number;
    this._handlers = {
      gestureStart: (e: Event): void => {
        this._handleGestureStart(e);
      },
      gestureChange: (e: Event): void => {
        this._handleGestureChange(e);
      },
      gestureEnd: (e: Event): void => {
        this._handleGestureEnd(e);
      },
      wheel: (e: Event): void => {
        this._handleMouseWheel(e as WheelEvent);
      },
      touchMove: (e: Event): void => {
        this._handleTouchZoom(e as TouchEvent);
      },
      touchEnd: (): void => {
        this._handleTouchEnd();
      },
    };
  }

  /**
   * Adding zoom listeners
   */
  addListeners(): void {
    this._manageListeners(true);
  }

  /**
   * Removing zoom listeners
   */
  removeListeners(): void {
    this._manageListeners(false);
  }

  /**
   * Handles trackpad gesture change event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  private readonly _handleGestureChange = (event: Event): void => {
    const container = this.container,
      canvas = container.canvas as {
        element?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.element;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this._isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    const gestureEvent = event as unknown as { clientX?: number; clientY?: number; scale?: number },
      baseZoom = defaultZoom,
      gestureFactor = zoomGestureFactor,
      scale = gestureEvent.scale ?? baseZoom;

    if (scale === this._gestureScale) {
      return;
    }

    const scaleDelta = scale / this._gestureScale,
      adjustedScale = baseZoom + (scaleDelta - baseZoom) * gestureFactor,
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * adjustedScale, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      clientX = gestureEvent.clientX ?? rect.left + rect.width / touchCenterDivisor,
      clientY = gestureEvent.clientY ?? rect.top + rect.height / touchCenterDivisor,
      pixelRatio = this.container.retina.pixelRatio,
      centerX = (clientX - rect.left) * pixelRatio,
      centerY = (clientY - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: centerX, y: centerY });

    this._gestureScale = scale;
  };

  /**
   * Handles trackpad gesture end event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  private readonly _handleGestureEnd = (event: Event): void => {
    const container = this.container,
      canvas = container.canvas as {
        element?: HTMLCanvasElement;
      },
      canvasEl = canvas.element;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this._isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    this._gestureScale = defaultZoom as number;
  };

  /**
   * Handles trackpad gesture start event (Safari/macOS)
   * @internal
   * @param event - the gesture event
   */
  private readonly _handleGestureStart = (event: Event): void => {
    const container = this.container,
      canvas = container.canvas as {
        element?: HTMLCanvasElement;
      },
      canvasEl = canvas.element;

    if (!canvasEl) {
      return;
    }

    const zoomOptions = container.actualOptions.zoom;

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this._isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    this._gestureScale = defaultZoom as number;
  };

  /**
   * Handles mouse wheel zoom event
   * @internal
   * @param event - the wheel event
   */
  private readonly _handleMouseWheel = (event: WheelEvent): void => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    const container = this.container,
      zoomOptions = container.actualOptions.zoom,
      canvas = container.canvas as {
        element?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.element;

    if (!canvasEl) {
      return;
    }

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this._isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    event.preventDefault();

    const zoomFactor = event.deltaY > initialTouchDistance ? (zoomOutFactor as number) : (zoomInFactor as number),
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * zoomFactor, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      pixelRatio = this.container.retina.pixelRatio,
      mouseX = (event.clientX - rect.left) * pixelRatio,
      mouseY = (event.clientY - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: mouseX, y: mouseY });
  };

  /**
   * Handles touch end and touch cancel events to reset touch distance
   * @internal
   * @param event - the touch event
   */
  private readonly _handleTouchEnd = (): void => {
    this._touchDistance = initialTouchDistance as number;
  };

  /**
   * Handles touch pinch to zoom event
   * @internal
   * @param event - the touch event
   */
  private readonly _handleTouchZoom = (event: TouchEvent): void => {
    if (event.touches.length !== touchPointsCount) {
      return;
    }

    event.preventDefault();

    const touch1 = event.touches[touchPointIndexFirst as number],
      touch2 = event.touches[touchPointIndexSecond as number];

    if (!touch1 || !touch2) {
      return;
    }

    const dx = touch1.clientX - touch2.clientX,
      dy = touch1.clientY - touch2.clientY,
      distance = Math.sqrt(dx * dx + dy * dy);

    if (this._touchDistance === initialTouchDistance) {
      this._touchDistance = distance;
      return;
    }

    const container = this.container,
      zoomOptions = container.actualOptions.zoom,
      canvas = container.canvas as {
        element?: HTMLCanvasElement;
        setZoom: (zoom: number, center: { x: number; y: number }) => void;
        zoom: number;
      },
      canvasEl = canvas.element;

    if (!canvasEl) {
      return;
    }

    if (!zoomOptions?.enable) {
      return;
    }

    if (!this._isEventInsideCanvas(event, canvasEl)) {
      return;
    }

    const scale = distance / this._touchDistance,
      baseZoom = defaultZoom,
      gestureFactor = zoomGestureFactor,
      adjustedScale = baseZoom + (scale - baseZoom) * gestureFactor,
      currentZoom = canvas.zoom,
      newZoom = Math.max(zoomOptions.min, Math.min(currentZoom * adjustedScale, zoomOptions.max)),
      rect = canvasEl.getBoundingClientRect(),
      pixelRatio = this.container.retina.pixelRatio,
      centerX = ((touch1.clientX + touch2.clientX) / touchCenterDivisor - rect.left) * pixelRatio,
      centerY = ((touch1.clientY + touch2.clientY) / touchCenterDivisor - rect.top) * pixelRatio;

    canvas.setZoom(newZoom, { x: centerX, y: centerY });

    this._touchDistance = distance;
  };

  /**
   * Check if event is inside canvas bounds
   * @internal
   * @param event - the event to check
   * @param canvasEl - the canvas element
   * @returns true if event is inside canvas
   */
  private readonly _isEventInsideCanvas = (event: Event, canvasEl: HTMLCanvasElement): boolean => {
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
  private readonly _manageListeners: (add: boolean) => void = add => {
    const handlers = this._handlers,
      canvas = this.container.canvas.element,
      options = this.container.actualOptions,
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
