import {
  type IContainerPlugin,
  type ICoordinates,
  double,
  executeOnSingleOrMultiple,
  lengthOffset,
  manageListener,
  safeDocument,
  visibilityChangeEvent,
} from "@tsparticles/engine";
import {
  mouseDownEvent,
  mouseLeaveEvent,
  mouseMoveEvent,
  mouseUpEvent,
  touchCancelEvent,
  touchEndEvent,
  touchMoveEvent,
  touchStartEvent,
} from "./InteractivityConstants.js";
import type { InteractionManager } from "./InteractionManager.js";
import type { InteractivityContainer } from "./types.js";
import { InteractivityDetect } from "./Enums/InteractivityDetect.js";

const touchDelay = 500;

interface InteractivityEventListenersHandlers {
  readonly mouseDown: EventListenerOrEventListenerObject;
  readonly mouseLeave: EventListenerOrEventListenerObject;
  readonly mouseMove: EventListenerOrEventListenerObject;
  readonly mouseUp: EventListenerOrEventListenerObject;
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
export class InteractivityEventListeners {
  #canPush = true;
  readonly #clickPositionPlugins: IContainerPlugin[];
  readonly #container;
  readonly #handlers: InteractivityEventListenersHandlers;
  readonly #interactionManager: InteractionManager;
  readonly #touches: Map<number, number>;

  /**
   * Events listener constructor
   * @param container - the calling container
   * @param interactionManager - the interaction manager instance
   */
  constructor(container: InteractivityContainer, interactionManager: InteractionManager) {
    this.#container = container;
    this.#clickPositionPlugins = [];
    this.#interactionManager = interactionManager;
    this.#touches = new Map<number, number>();
    this.#handlers = {
      mouseDown: (): void => {
        this.#mouseDown();
      },
      mouseLeave: (): void => {
        this.#mouseTouchFinish();
      },
      mouseMove: (e): void => {
        this.#mouseTouchMove(e);
      },
      mouseUp: (e): void => {
        this.#mouseTouchClick(e);
      },
      touchStart: (e): void => {
        this.#touchStart(e);
      },
      touchMove: (e): void => {
        this.#mouseTouchMove(e);
      },
      touchEnd: (e): void => {
        this.#touchEnd(e);
      },
      touchCancel: (e: Event): void => {
        this.#touchEnd(e);
      },
      touchEndClick: (e): void => {
        this.#touchEndClick(e);
      },
      visibilityChange: (): void => {
        this.#handleVisibilityChange();
      },
    };
  }

  /**
   * Adding all listeners
   */
  addListeners(): void {
    this.#manageListeners(true);
  }

  init(): void {
    this.#clickPositionPlugins.length = 0;

    for (const plugin of this.#container.plugins.filter(p => !!p.clickPositionValid)) {
      this.#clickPositionPlugins.push(plugin);
    }
  }

  /**
   * Removing all listeners
   */
  removeListeners(): void {
    this.#manageListeners(false);
  }

  /**
   * Mouse/Touch click/tap event implementation
   * @param e - the click event arguments
   */
  readonly #doMouseTouchClick: (e: Event) => void = e => {
    const container = this.#container,
      interactionManager = this.#interactionManager,
      options = container.actualOptions;

    if (this.#canPush) {
      const mouseInteractivity = interactionManager.interactivityData.mouse,
        mousePos = mouseInteractivity.position;

      if (!mousePos) {
        return;
      }

      mouseInteractivity.clickPosition = { ...mousePos };
      mouseInteractivity.clickTime = performance.now();

      const onClick = options.interactivity?.events.onClick;

      if (!onClick?.mode) {
        return;
      }

      executeOnSingleOrMultiple(onClick.mode, mode => {
        interactionManager.handleClickMode(mode);
      });
    }

    if (e.type === "touchend") {
      setTimeout(() => {
        this.#mouseTouchFinish();
      }, touchDelay);
    }
  };

  /**
   * Handles blur event
   * @internal
   */
  readonly #handleVisibilityChange: () => void = () => {
    this.#mouseTouchFinish();
  };

  readonly #manageInteractivityListeners: (add: boolean) => void = add => {
    const handlers = this.#handlers,
      container = this.#container,
      interactionManager = this.#interactionManager,
      options = container.actualOptions,
      interactivityEl = interactionManager.interactivityData.element;

    /* detect mouse pos - on hover / click event */
    if (!interactivityEl) {
      return;
    }

    const html = interactivityEl as HTMLElement,
      canvas = container.canvas;

    canvas.setPointerEvents(html === canvas.domElement ? "initial" : "none");

    if (add && !(options.interactivity?.events.onHover.enable || options.interactivity?.events.onClick.enable)) {
      return;
    }

    manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
    manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
    manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);

    if (add) {
      if (options.interactivity?.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      } else {
        /* el on touchend */
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      }
    } else {
      manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
      manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
      manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
    }

    manageListener(interactivityEl, mouseLeaveEvent, handlers.mouseLeave, add);
    manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
  };

  /**
   * Initializing event listeners
   * @param add -
   */
  readonly #manageListeners: (add: boolean) => void = add => {
    const handlers = this.#handlers,
      container = this.#container,
      interactionManager = this.#interactionManager,
      options = container.actualOptions,
      detectType = options.interactivity?.detectsOn,
      canvasEl = container.canvas.domElement;

    /* events target element */
    if (detectType === InteractivityDetect.window) {
      interactionManager.interactivityData.element = safeDocument();
    } else if (detectType === InteractivityDetect.parent && canvasEl) {
      interactionManager.interactivityData.element = canvasEl.parentElement ?? canvasEl.parentNode;
    } else {
      interactionManager.interactivityData.element = canvasEl;
    }

    this.#manageInteractivityListeners(add);

    manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
  };

  /**
   * Handle mouse down event
   * @internal
   */
  readonly #mouseDown: () => void = () => {
    const { interactivityData } = this.#interactionManager,
      { mouse } = interactivityData;

    mouse.clicking = true;
    mouse.downPosition = mouse.position;
  };

  /**
   * Mouse/Touch click/tap event
   * @param e - the click event arguments
   */
  readonly #mouseTouchClick: (e: Event) => void = e => {
    const container = this.#container,
      interactionManager = this.#interactionManager,
      options = container.actualOptions,
      { mouse } = interactionManager.interactivityData;

    mouse.inside = true;

    let handled = false;

    const mousePosition = mouse.position;

    if (!mousePosition || !options.interactivity?.events.onClick.enable) {
      return;
    }

    for (const plugin of this.#clickPositionPlugins) {
      handled = plugin.clickPositionValid?.(mousePosition) ?? false;

      if (handled) {
        break;
      }
    }

    if (!handled) {
      this.#doMouseTouchClick(e);
    }

    mouse.clicking = false;
  };

  /**
   * Mouse/Touch event finish
   */
  readonly #mouseTouchFinish: () => void = () => {
    const { interactivityData } = this.#interactionManager,
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
  readonly #mouseTouchMove: (e: Event) => void = e => {
    const container = this.#container,
      interactionManager = this.#interactionManager,
      options = container.actualOptions,
      interactivity = interactionManager.interactivityData,
      canvasEl = container.canvas.domElement;

    if (!interactivity.element) {
      return;
    }

    interactivity.mouse.inside = true;

    let pos: ICoordinates | undefined;

    if (e.type.startsWith("pointer")) {
      this.#canPush = true;

      const mouseEvent = e as MouseEvent;

      if (interactivity.element === safeDocument()) {
        if (canvasEl) {
          const clientRect = canvasEl.getBoundingClientRect();

          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top,
          };
        }
      } else if (options.interactivity?.detectsOn === InteractivityDetect.parent) {
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
      this.#canPush = e.type !== "touchmove";

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

  readonly #touchEnd: (e: Event) => void = e => {
    const evt = e as TouchEvent,
      touches = Array.from(evt.changedTouches);

    for (const touch of touches) {
      this.#touches.delete(touch.identifier);
    }

    this.#mouseTouchFinish();
  };

  readonly #touchEndClick: (e: Event) => void = e => {
    const evt = e as TouchEvent,
      touches = Array.from(evt.changedTouches);

    for (const touch of touches) {
      this.#touches.delete(touch.identifier);
    }

    this.#mouseTouchClick(e);
  };

  readonly #touchStart: (e: Event) => void = e => {
    const evt = e as TouchEvent,
      touches = Array.from(evt.changedTouches);

    for (const touch of touches) {
      this.#touches.set(touch.identifier, performance.now());
    }

    this.#mouseTouchMove(e);
  };
}
