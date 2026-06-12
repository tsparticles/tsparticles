import { manageListener, safeDocument } from "../../Utils/Utils.js";
import { millisecondsToSeconds, resizeEvent, visibilityChangeEvent } from "./Constants.js";
import type { Container } from "../Container.js";

interface EventListenersHandlers {
  readonly resize: EventListenerOrEventListenerObject;
  readonly visibilityChange: EventListenerOrEventListenerObject;
}

/**
 * Particles container event listeners manager
 */
export class EventListeners {
  readonly #container: Container;
  readonly #handlers: EventListenersHandlers;
  #resizeObserver?: ResizeObserver;
  #resizeTimeout?: number;

  /**
   * Events listener constructor
   * @param container - the calling container
   */
  constructor(container: Container) {
    this.#container = container;
    this.#handlers = {
      visibilityChange: (): void => {
        this.#handleVisibilityChange();
      },
      resize: (): void => {
        this.#handleWindowResize();
      },
    };
  }

  /**
   * Adding all listeners
   */
  addListeners(): void {
    this.#manageListeners(true);
  }

  /**
   * Removing all listeners
   */
  removeListeners(): void {
    this.#manageListeners(false);
  }

  /**
   * Handles blur event
   * @internal
   */
  #handleVisibilityChange(): void {
    const container = this.#container,
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
  }

  #handleWindowResize(): void {
    if (this.#resizeTimeout) {
      clearTimeout(this.#resizeTimeout);

      this.#resizeTimeout = undefined;
    }

    const handleResize = async (): Promise<void> => {
      const canvas = this.#container.canvas;

      await canvas.windowResize();
    };

    this.#resizeTimeout = setTimeout(
      () => void handleResize(),
      this.#container.actualOptions.resize.delay * millisecondsToSeconds,
    );
  }

  /**
   * Initializing event listeners
   * @param add -
   */
  #manageListeners(add: boolean): void {
    const handlers = this.#handlers;

    this.#manageResize(add);

    manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
  }

  #manageResize(add: boolean): void {
    const handlers = this.#handlers,
      container = this.#container,
      options = container.actualOptions;

    if (!options.resize.enable) {
      return;
    }

    if (typeof ResizeObserver === "undefined") {
      manageListener(globalThis, resizeEvent, handlers.resize, add);

      return;
    }

    const canvasEl = container.canvas.domElement;

    if (this.#resizeObserver && !add) {
      if (canvasEl) {
        this.#resizeObserver.unobserve(canvasEl);
      }

      this.#resizeObserver.disconnect();

      this.#resizeObserver = undefined;
    } else if (!this.#resizeObserver && add && canvasEl) {
      this.#resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]): void => {
        const entry = entries.find(e => e.target === canvasEl);

        if (!entry) {
          return;
        }

        this.#handleWindowResize();
      });

      this.#resizeObserver.observe(canvasEl);
    }
  }
}
