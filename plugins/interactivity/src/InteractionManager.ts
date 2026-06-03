import { type Container, type ICoordinates, type IDelta, type Particle } from "@tsparticles/engine";
import {
  clickEvent,
  touchCancelEvent,
  touchEndEvent,
  touchMoveEvent,
  touchStartEvent,
} from "./InteractivityConstants.js";
import type { IExternalInteractor } from "./Interfaces/IExternalInteractor.js";
import type { IInteractivityData } from "./Interfaces/IInteractivityData.js";
import type { IInteractor } from "./Interfaces/IInteractor.js";
import type { IParticlesInteractor } from "./Interfaces/IParticlesInteractor.js";
import { InteractivityEventListeners } from "./InteractivityEventListeners.js";
import type { InteractivityPluginManager } from "./types.js";
import { InteractorType } from "./Enums/InteractorType.js";

const clickRadius = 1,
  touchEndLengthOffset = 1,
  minCoordinate = 0;

/** Container click handler type */
type ContainerClickHandler = (evt: Event) => void;

/**
 * Safely creates an IntersectionObserver if supported
 * @param callback - the observer callback
 * @returns the intersection observer, if supported
 */
function safeIntersectionObserver(
  callback: (records: IntersectionObserverEntry[]) => void,
): IntersectionObserver | undefined {
  if (typeof IntersectionObserver === "undefined") {
    return;
  }

  return new IntersectionObserver(callback);
}

export class InteractionManager {
  /** The current interactivity state data */
  interactivityData: IInteractivityData;

  /** Map of event names to click handlers */
  readonly #clickHandlers;

  /**
   * The constructor of the interaction manager
   * @param container - the parent container
   */
  readonly #container: Container;

  /** The event listeners instance */
  readonly #eventListeners;

  /**
   * Registered external interactivity managers
   * @internal
   */
  #externalInteractors: IExternalInteractor[];

  /**
   * The interactors that are used for initialization
   * @internal
   */
  #interactors: IInteractor[];

  /** The intersection observer for viewport detection */
  readonly #intersectionObserver;

  /**
   * Registered particles interactions managers
   * @internal
   */
  #particleInteractors: IParticlesInteractor[];

  /**
   * The plugin manager used for registering the interactions managers
   * @internal
   */
  readonly #pluginManager;

  constructor(pluginManager: InteractivityPluginManager, container: Container) {
    this.#container = container;
    this.#pluginManager = pluginManager;
    this.#interactors = [];
    this.#externalInteractors = [];
    this.#particleInteractors = [];
    this.#clickHandlers = new Map<string, ContainerClickHandler>();
    this.#eventListeners = new InteractivityEventListeners(container, this);
    this.interactivityData = {
      mouse: {
        clicking: false,
        inside: false,
      },
    };
    this.#intersectionObserver = safeIntersectionObserver(entries => {
      this.#intersectionManager(entries);
    });
  }

  /**
   * Adds a click/touch handler to the container element
   * @param callback - the callback to invoke on click/touch
   */
  addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
    const container = this.#container,
      interactivityData = this.interactivityData;

    if (container.destroyed) {
      return;
    }

    const el = interactivityData.element;

    if (!el) {
      return;
    }

    const clickOrTouchHandler = (e: Event, pos: ICoordinates, radius: number): void => {
        if (container.destroyed) {
          return;
        }

        const pxRatio = container.retina.pixelRatio,
          posRetina = {
            x: pos.x * pxRatio,
            y: pos.y * pxRatio,
          },
          particles = container.particles.grid.queryCircle(posRetina, radius * pxRatio);

        callback(e, particles);
      },
      clickHandler = (e: Event): void => {
        if (container.destroyed) {
          return;
        }

        const mouseEvent = e as MouseEvent,
          pos = {
            x: mouseEvent.offsetX,
            y: mouseEvent.offsetY,
          };

        clickOrTouchHandler(e, pos, clickRadius);
      },
      touchStartHandler = (): void => {
        if (container.destroyed) {
          return;
        }

        touched = true;
        touchMoved = false;
      },
      touchMoveHandler = (): void => {
        if (container.destroyed) {
          return;
        }

        touchMoved = true;
      },
      touchEndHandler = (e: Event): void => {
        if (container.destroyed) {
          return;
        }

        if (touched && !touchMoved) {
          const touchEvent = e as TouchEvent,
            lastTouch = touchEvent.touches[touchEvent.touches.length - touchEndLengthOffset];

          if (!lastTouch) {
            return;
          }

          const element = container.canvas.domElement,
            canvasRect = element ? element.getBoundingClientRect() : undefined,
            pos = {
              x: lastTouch.clientX - (canvasRect ? canvasRect.left : minCoordinate),
              y: lastTouch.clientY - (canvasRect ? canvasRect.top : minCoordinate),
            };

          clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
        }

        touched = false;
        touchMoved = false;
      },
      touchCancelHandler = (): void => {
        if (container.destroyed) {
          return;
        }

        touched = false;
        touchMoved = false;
      };

    let touched = false,
      touchMoved = false;

    this.#clickHandlers.set(clickEvent, clickHandler);
    this.#clickHandlers.set(touchStartEvent, touchStartHandler);
    this.#clickHandlers.set(touchMoveEvent, touchMoveHandler);
    this.#clickHandlers.set(touchEndEvent, touchEndHandler);
    this.#clickHandlers.set(touchCancelEvent, touchCancelHandler);

    for (const [key, handler] of this.#clickHandlers) {
      el.addEventListener(key, handler);
    }
  }

  /** Adds interactivity event listeners */
  addListeners(): void {
    this.#eventListeners.addListeners();
  }

  /** Clears all click and touch handlers */
  clearClickHandlers(): void {
    const container = this.#container,
      interactivityData = this.interactivityData;

    if (container.destroyed) {
      return;
    }

    for (const [key, handler] of this.#clickHandlers) {
      interactivityData.element?.removeEventListener(key, handler);
    }

    this.#clickHandlers.clear();
  }

  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  externalInteract(delta: IDelta): void {
    for (const interactor of this.#externalInteractors) {
      const interactivityData = this.interactivityData;

      if (interactor.isEnabled(interactivityData)) {
        interactor.interact(interactivityData, delta);
      }
    }
  }

  /**
   * Handles a click mode for all external interactors
   * @param mode - the click mode to handle
   */
  handleClickMode(mode: string): void {
    if (this.#container.destroyed) {
      return;
    }

    const interactivityData = this.interactivityData;

    for (const interactor of this.#externalInteractors) {
      interactor.handleClickMode?.(mode, interactivityData);
    }
  }

  /**
   * Initializes the interaction manager, loading all the engine registered managers into the container
   */
  init(): void {
    this.#eventListeners.init();

    for (const interactor of this.#interactors) {
      switch (interactor.type) {
        case InteractorType.external:
          this.#externalInteractors.push(interactor as IExternalInteractor);

          break;
        case InteractorType.particles:
          this.#particleInteractors.push(interactor as IParticlesInteractor);

          break;
      }

      interactor.init();
    }
  }

  /** Initializes all interactors from the plugin manager */
  async initInteractors(): Promise<void> {
    const interactors = await this.#pluginManager.getInteractors?.(this.#container, true);

    if (!interactors) {
      return;
    }

    this.#interactors = interactors;
    this.#externalInteractors = [];
    this.#particleInteractors = [];
  }

  /**
   * Iterates through the particles interactions manager and call the interact method, if they are enabled
   * @param particle - the particle responsible for the current interaction
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  particlesInteract(particle: Particle, delta: IDelta): void {
    const interactivityData = this.interactivityData;

    for (const interactor of this.#externalInteractors) {
      interactor.clear(particle, delta);
    }

    /* interaction auto between particles */
    for (const interactor of this.#particleInteractors) {
      if (interactor.isEnabled(particle, interactivityData)) {
        interactor.interact(particle, interactivityData, delta);
      }
    }
  }

  /** Removes all interactivity event listeners */
  removeListeners(): void {
    this.#eventListeners.removeListeners();
  }

  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param particle - the particle to reset
   */
  reset(particle: Particle): void {
    const interactivityData = this.interactivityData;

    for (const interactor of this.#externalInteractors) {
      if (interactor.isEnabled(interactivityData)) {
        interactor.reset(interactivityData, particle);
      }
    }

    for (const interactor of this.#particleInteractors) {
      if (interactor.isEnabled(particle, interactivityData)) {
        interactor.reset(interactivityData, particle);
      }
    }
  }

  /** Starts observing the container element for intersection changes */
  startObserving(): void {
    const interactivityData = this.interactivityData;

    if (interactivityData.element instanceof HTMLElement && this.#intersectionObserver) {
      this.#intersectionObserver.observe(interactivityData.element);
    }
  }

  /** Stops observing the container element for intersection changes */
  stopObserving(): void {
    const interactivityData = this.interactivityData;

    if (interactivityData.element instanceof HTMLElement && this.#intersectionObserver) {
      this.#intersectionObserver.unobserve(interactivityData.element);
    }
  }

  /** Updates the maximum distance for the spatial grid */
  updateMaxDistance(): void {
    let maxTotalDistance = 0;

    for (const interactor of this.#interactors) {
      if (interactor.maxDistance > maxTotalDistance) {
        maxTotalDistance = interactor.maxDistance;
      }
    }

    const container = this.#container;

    container.particles.grid.setCellSize(maxTotalDistance * container.retina.pixelRatio);
  }

  #intersectionManager(entries: IntersectionObserverEntry[]): void {
    const container = this.#container;

    if (container.destroyed || !container.actualOptions.pauseOnOutsideViewport) {
      return;
    }

    for (const entry of entries) {
      if (entry.target !== this.interactivityData.element) {
        continue;
      }

      if (entry.isIntersecting) {
        container.play();
      } else {
        container.pause();
      }
    }
  }
}
