import {
  type Container,
  type ICoordinates,
  type IDelta,
  type Particle,
  clickRadius,
  minCoordinate,
  safeIntersectionObserver,
  touchEndLengthOffset,
} from "@tsparticles/engine";
import {
  clickEvent,
  touchCancelEvent,
  touchEndEvent,
  touchMoveEvent,
  touchStartEvent,
} from "./InteractivityConstants.js";
import type { IExternalInteractor } from "./IExternalInteractor.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IInteractor } from "./IInteractor.js";
import type { IParticlesInteractor } from "./IParticlesInteractor.js";
import type { InteractivityEngine } from "./types.js";
import { InteractivityEventListeners } from "./InteractivityEventListeners.js";
import { InteractorType } from "./InteractorType.js";

type ContainerClickHandler = (evt: Event) => void;

export class InteractionManager {
  interactivityData: IInteractivityData;

  private readonly _clickHandlers;

  /**
   * The engine used for registering the interactions managers
   * @internal
   */
  private readonly _engine;

  private readonly _eventListeners;

  /**
   * Registered external interactivity managers
   * @internal
   */
  private _externalInteractors: IExternalInteractor[];

  /**
   * The interactors that are used for initialization
   * @internal
   */
  private _interactors: IInteractor[];

  private readonly _intersectionObserver;

  /**
   * Registered particles interactions managers
   * @internal
   */
  private _particleInteractors: IParticlesInteractor[];

  /**
   * The constructor of the interaction manager
   * @param engine - the parent engine
   * @param container - the parent container
   */
  constructor(
    engine: InteractivityEngine,
    private readonly container: Container,
  ) {
    this._engine = engine;
    this._interactors = [];
    this._externalInteractors = [];
    this._particleInteractors = [];
    this._clickHandlers = new Map<string, ContainerClickHandler>();
    this._eventListeners = new InteractivityEventListeners(container, this);
    this.interactivityData = {
      mouse: {
        clicking: false,
        inside: false,
      },
    };
    this._intersectionObserver = safeIntersectionObserver(entries => {
      this._intersectionManager(entries);
    });
  }

  addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
    const { container, interactivityData } = this;

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
          particles = container.particles.quadTree.queryCircle(posRetina, radius * pxRatio);

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

          const element = container.canvas.element,
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

    this._clickHandlers.set(clickEvent, clickHandler);
    this._clickHandlers.set(touchStartEvent, touchStartHandler);
    this._clickHandlers.set(touchMoveEvent, touchMoveHandler);
    this._clickHandlers.set(touchEndEvent, touchEndHandler);
    this._clickHandlers.set(touchCancelEvent, touchCancelHandler);

    for (const [key, handler] of this._clickHandlers) {
      el.addEventListener(key, handler);
    }
  }

  addListeners(): void {
    this._eventListeners.addListeners();
  }

  clearClickHandlers(): void {
    const { container, interactivityData } = this;

    if (container.destroyed) {
      return;
    }

    for (const [key, handler] of this._clickHandlers) {
      interactivityData.element?.removeEventListener(key, handler);
    }

    this._clickHandlers.clear();
  }

  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  externalInteract(delta: IDelta): void {
    for (const interactor of this._externalInteractors) {
      const { interactivityData } = this;

      if (interactor.isEnabled(interactivityData)) {
        interactor.interact(interactivityData, delta);
      }
    }
  }

  handleClickMode(mode: string): void {
    if (this.container.destroyed) {
      return;
    }

    const { interactivityData } = this;

    for (const interactor of this._externalInteractors) {
      interactor.handleClickMode?.(mode, interactivityData);
    }
  }

  /**
   * Initializes the interaction manager, loading all the engine registered managers into the container
   */
  async init(): Promise<void> {
    const interactors = await this._engine.getInteractors?.(this.container, true);

    if (!interactors) {
      return;
    }

    this._interactors = interactors;
    this._externalInteractors = [];
    this._particleInteractors = [];
    this._eventListeners.init();

    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case InteractorType.external:
          this._externalInteractors.push(interactor as IExternalInteractor);
          break;
        case InteractorType.particles:
          this._particleInteractors.push(interactor as IParticlesInteractor);
          break;
      }

      interactor.init();
    }
  }

  /**
   * Iterates through the particles interactions manager and call the interact method, if they are enabled
   * @param particle - the particle responsible for the current interaction
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  particlesInteract(particle: Particle, delta: IDelta): void {
    const { interactivityData } = this;

    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }

    /* interaction auto between particles */
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle, interactivityData)) {
        interactor.interact(particle, interactivityData, delta);
      }
    }
  }

  removeListeners(): void {
    this._eventListeners.removeListeners();
  }

  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param particle - the particle to reset
   */
  reset(particle: Particle): void {
    const { interactivityData } = this;

    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled(interactivityData)) {
        interactor.reset(interactivityData, particle);
      }
    }

    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle, interactivityData)) {
        interactor.reset(interactivityData, particle);
      }
    }
  }

  startObserving(): void {
    const { interactivityData } = this;

    if (interactivityData.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.observe(interactivityData.element);
    }
  }

  stopObserving(): void {
    const { interactivityData } = this;

    if (interactivityData.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(interactivityData.element);
    }
  }

  private readonly _intersectionManager: (entries: IntersectionObserverEntry[]) => void = entries => {
    const { container } = this;

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
  };
}
