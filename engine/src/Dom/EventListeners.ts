import { manageListener, safeDocument } from "../Utils/Utils.js";
import { millisecondsToSeconds, resizeEvent, visibilityChangeEvent } from "../Core/Utils/Constants.js";
import type { Container } from "../Core/Container.js";

interface EventListenersHandlers {
  readonly resize: EventListenerOrEventListenerObject;
  readonly visibilityChange: EventListenerOrEventListenerObject;
}

/**
 * Particles container event listeners manager.
 */
export class EventListeners {
  private readonly _handlers: EventListenersHandlers;
  private _resizeObserver?: ResizeObserver;
  private _resizeTimeout?: number;

  /**
   * Events listener constructor.
   * @param container - the calling container
   */
  constructor(private readonly container: Container) {
    this._handlers = {
      visibilityChange: (): void => {
        this._handleVisibilityChange();
      },
      resize: (): void => {
        this._handleWindowResize();
      },
    };
  }

  /** Adds all listeners. */
  addListeners(): void {
    this._manageListeners(true);
  }

  /** Removes all listeners. */
  removeListeners(): void {
    this._manageListeners(false);
  }

  private readonly _handleVisibilityChange: () => void = () => {
    const container = this.container,
      options = container.actualOptions;

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

  private readonly _handleWindowResize = (): void => {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);

      delete this._resizeTimeout;
    }

    const handleResize = async (): Promise<void> => {
      await this.container.canvas.windowResize();
    };

    this._resizeTimeout = setTimeout(
      () => void handleResize(),
      this.container.actualOptions.resize.delay * millisecondsToSeconds,
    );
  };

  private readonly _manageListeners: (add: boolean) => void = add => {
    const handlers = this._handlers;

    this._manageResize(add);

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

    const canvasEl = container.canvas.domElement;

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
}
