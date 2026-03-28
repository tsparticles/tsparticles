import {
  type Container,
  type ICoordinates,
  type IDelta,
  type Particle,
  safeIntersectionObserver,
} from "@tsparticles/engine";
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

type ContainerClickHandler = (evt: Event) => void;

export class InteractionManager {
  interactivityData: IInteractivityData;

  private readonly _clickHandlers;

  private readonly _container;

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

  private readonly _pluginManager;

  /**
   * The constructor of the interaction manager
   * @param pluginManager - the plugin manager
   * @param container - the parent container
   */
  constructor(pluginManager: InteractivityPluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
    this._interactors = [];
    this._externalInteractors = [];
    this._particleInteractors = [];
    this._clickHandlers = new Map<string, ContainerClickHandler>();
    this._eventListeners = new InteractivityEventListeners(this._container, this);
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
    const { _container, interactivityData } = this;

    if (_container.destroyed) {
      return;
    }

    const el = interactivityData.element;

    if (!el) {
      return;
    }

    const clickOrTouchHandler = (e: Event, pos: ICoordinates, radius: number): void => {
        if (_container.destroyed) {
          return;
        }

        const pxRatio = _container.retina.pixelRatio,
          posRetina = {
            x: pos.x * pxRatio,
            y: pos.y * pxRatio,
          },
          particles = _container.particles.grid.queryCircle(posRetina, radius * pxRatio);

        callback(e, particles);
      },
      clickHandler = (e: Event): void => {
        if (_container.destroyed) {
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
        if (_container.destroyed) {
          return;
        }

        touched = true;
        touchMoved = false;
      },
      touchMoveHandler = (): void => {
        if (_container.destroyed) {
          return;
        }

        touchMoved = true;
      },
      touchEndHandler = (e: Event): void => {
        if (_container.destroyed) {
          return;
        }

        if (touched && !touchMoved) {
          const touchEvent = e as TouchEvent,
            lastTouch = touchEvent.touches[touchEvent.touches.length - touchEndLengthOffset];

          if (!lastTouch) {
            return;
          }

          const element = _container.canvas.domElement,
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
        if (_container.destroyed) {
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
    const { _container, interactivityData } = this;

    if (_container.destroyed) {
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
    if (this._container.destroyed) {
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
  init(): void {
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

  async initInteractors(): Promise<void> {
    const interactors = await this._pluginManager.getInteractors?.(this._container, true);

    if (!interactors) {
      return;
    }

    this._interactors = interactors;
    this._externalInteractors = [];
    this._particleInteractors = [];
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

  updateMaxDistance(): void {
    let maxTotalDistance = 0;

    for (const interactor of this._interactors) {
      if (interactor.maxDistance > maxTotalDistance) {
        maxTotalDistance = interactor.maxDistance;
      }
    }

    const container = this._container;

    container.particles.grid.setCellSize(maxTotalDistance * container.retina.pixelRatio);
  }

  private readonly _intersectionManager: (entries: IntersectionObserverEntry[]) => void = entries => {
    const { _container } = this;

    if (_container.destroyed || !_container.actualOptions.pauseOnOutsideViewport) {
      return;
    }

    for (const entry of entries) {
      if (entry.target !== this.interactivityData.element) {
        continue;
      }

      if (entry.isIntersecting) {
        _container.play();
      } else {
        _container.pause();
      }
    }
  };
}
