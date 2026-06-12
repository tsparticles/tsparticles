import type { BubbleContainer, BubbleMode, IBubbleMode } from "./Types.js";
import {
  Circle,
  type IDelta,
  type Particle,
  type PluginManager,
  Rectangle,
  type RecursivePartial,
  colorMix,
  double,
  getDistance,
  half,
  isInArray,
  itemFromSingleOrMultiple,
  loadOptionProperty,
  millisecondsToSeconds,
  rangeColorToHsl,
  rgbToHsl,
  safeDocument,
} from "@tsparticles/engine";
import {
  type DivEvent,
  DivType,
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
  divMode,
  divModeExecute,
  isDivModeEnabled,
  mouseLeaveEvent,
  mouseMoveEvent,
} from "@tsparticles/plugin-interactivity";
import { Bubble } from "./Options/Classes/Bubble.js";
import type { BubbleDiv } from "./Options/Classes/BubbleDiv.js";
import type { Interfaces } from "./Interfaces.js";
import { ProcessBubbleType } from "./Enums.js";
import { calculateBubbleValue } from "./Utils.js";

const bubbleMode = "bubble",
  minDistance = 0,
  defaultClickTime = 0,
  defaultOpacity = 1,
  ratioOffset = 1,
  defaultBubbleValue = 0,
  minRatio = 0,
  defaultRatio = 1;

/**
 * Particle bubble manager
 */
export class Bubbler extends ExternalInteractorBase<BubbleContainer> {
  /** @inheritDoc */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  #maxDistance;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container: BubbleContainer) {
    super(container);

    this.#pluginManager = pluginManager;
    this.#maxDistance = 0;

    container.bubble ??= {};

    this.handleClickMode = (mode): void => {
      if (mode !== bubbleMode) {
        return;
      }

      container.bubble ??= {};

      container.bubble.clicking = true;
    };
  }

  /** @inheritDoc */
  get maxDistance(): number {
    return this.#maxDistance;
  }

  /** @inheritDoc */
  clear(particle: Particle, _delta: IDelta, force?: boolean): void {
    if (particle.bubble.inRange && !force) {
      return;
    }

    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }

  /** @inheritDoc */
  init(): void {
    const container = this.container,
      bubble = container.actualOptions.interactivity?.modes.bubble;

    if (!bubble) {
      return;
    }

    this.#maxDistance = bubble.distance;

    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;

    if (bubble.size !== undefined) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData, delta: IDelta): void {
    const options = this.container.actualOptions,
      events = options.interactivity?.events;

    if (!events) {
      return;
    }

    const onHover = events.onHover,
      onClick = events.onClick,
      hoverEnabled = onHover.enable,
      hoverMode = onHover.mode,
      clickEnabled = onClick.enable,
      clickMode = onClick.mode,
      divs = events.onDiv;

    /* on hover event */
    if (hoverEnabled && isInArray(bubbleMode, hoverMode)) {
      this.#hoverBubble(interactivityData);
    } else if (clickEnabled && isInArray(bubbleMode, clickMode)) {
      this.#clickBubble(interactivityData);
    } else {
      divModeExecute(bubbleMode, divs, (selector, div): void => {
        this.#singleSelectorHover(interactivityData, delta, selector, div);
      });
    }
  }

  /** @inheritDoc */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    if (!events) {
      return false;
    }

    const { onClick, onDiv, onHover } = events,
      divBubble = isDivModeEnabled(bubbleMode, onDiv);

    if (!(divBubble || (onHover.enable && !!mouse.position) || (onClick.enable && mouse.clickPosition))) {
      return false;
    }

    return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
  }

  /** @inheritDoc */
  loadModeOptions(
    options: Modes & BubbleMode,
    ...sources: RecursivePartial<(IModes & IBubbleMode) | undefined>[]
  ): void {
    loadOptionProperty(options, "bubble", Bubble, ...sources);
  }

  /** @inheritDoc */
  reset(_interactivityData: IInteractivityData, particle: Particle): void {
    particle.bubble.inRange = false;
  }

  #clickBubble(interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions,
      mouseClickPos = interactivityData.mouse.clickPosition,
      bubbleOptions = options.interactivity?.modes.bubble;

    if (!bubbleOptions || !mouseClickPos) {
      return;
    }

    container.bubble ??= {};

    const distance = container.retina.bubbleModeDistance;

    if (!distance || distance < minDistance) {
      return;
    }

    const query = container.particles.grid.queryCircle(mouseClickPos, distance, p =>
        this.isEnabled(interactivityData, p),
      ),
      { bubble } = container;

    for (const particle of query) {
      if (!bubble.clicking) {
        continue;
      }

      particle.bubble.inRange = !bubble.durationEnd;

      const pos = particle.getPosition(),
        distMouse = getDistance(pos, mouseClickPos),
        timeSpent =
          (performance.now() - (interactivityData.mouse.clickTime ?? defaultClickTime)) / millisecondsToSeconds;

      if (timeSpent > bubbleOptions.duration) {
        bubble.durationEnd = true;
      }

      if (timeSpent > bubbleOptions.duration * double) {
        bubble.clicking = false;
        bubble.durationEnd = false;
      }

      const sizeData: Interfaces = {
        bubbleObj: {
          optValue: container.retina.bubbleModeSize,
          value: particle.bubble.radius,
        },
        particlesObj: {
          optValue: particle.size.max,
          value: particle.size.value,
        },
        type: ProcessBubbleType.size,
      };

      this.#process(particle, distMouse, timeSpent, sizeData);

      const opacityData: Interfaces = {
        bubbleObj: {
          optValue: bubbleOptions.opacity,
          value: particle.bubble.opacity,
        },
        particlesObj: {
          optValue: particle.opacity?.max ?? defaultOpacity,
          value: particle.opacity?.value ?? defaultOpacity,
        },
        type: ProcessBubbleType.opacity,
      };

      this.#process(particle, distMouse, timeSpent, opacityData);

      if (!bubble.durationEnd && distMouse <= distance) {
        this.#hoverBubbleColor(particle, distMouse);
      } else {
        delete particle.bubble.color;
      }
    }
  }

  #hoverBubble(interactivityData: IInteractivityData): void {
    const container = this.container,
      mousePos = interactivityData.mouse.position,
      distance = container.retina.bubbleModeDistance;

    if (!distance || distance < minDistance || !mousePos) {
      return;
    }

    const query = container.particles.grid.queryCircle(mousePos, distance, p => this.isEnabled(interactivityData, p));

    // for (const { distance, particle } of query) {
    for (const particle of query) {
      particle.bubble.inRange = true;

      const pos = particle.getPosition(),
        pointDistance = getDistance(pos, mousePos),
        ratio = ratioOffset - pointDistance / distance;

      /* mousemove - check ratio */
      if (pointDistance <= distance) {
        if (ratio >= minRatio && interactivityData.status === mouseMoveEvent) {
          /* size */
          this.#hoverBubbleSize(particle, ratio);

          /* opacity */
          this.#hoverBubbleOpacity(particle, ratio);

          /* color */
          this.#hoverBubbleColor(particle, ratio);
        }
      } else {
        this.reset(interactivityData, particle);
      }

      /* mouseleave */
      if (interactivityData.status === mouseLeaveEvent) {
        this.reset(interactivityData, particle);
      }
    }
  }

  #hoverBubbleColor(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
    const options = this.container.actualOptions,
      bubbleOptions = divBubble ?? options.interactivity?.modes.bubble;

    if (!bubbleOptions) {
      return;
    }

    if (!particle.bubble.finalColor) {
      const modeColor = bubbleOptions.color;

      if (!modeColor) {
        return;
      }

      const bubbleColor = itemFromSingleOrMultiple(modeColor);

      particle.bubble.finalColor = rangeColorToHsl(this.#pluginManager, bubbleColor);
    }

    if (!particle.bubble.finalColor) {
      return;
    }

    if (bubbleOptions.mix) {
      particle.bubble.color = undefined;

      const pColor = particle.getFillColor();

      particle.bubble.color = pColor
        ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, ratioOffset - ratio, ratio))
        : particle.bubble.finalColor;
    } else {
      particle.bubble.color = particle.bubble.finalColor;
    }
  }

  #hoverBubbleOpacity(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
    const container = this.container,
      options = container.actualOptions,
      modeOpacity = divBubble?.opacity ?? options.interactivity?.modes.bubble?.opacity;

    if (!modeOpacity) {
      return;
    }

    const pOpacity = particle.opacity?.value ?? defaultOpacity,
      opacity = calculateBubbleValue(pOpacity, modeOpacity, particle.opacity?.max ?? defaultOpacity, ratio);

    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
    }
  }

  #hoverBubbleSize(particle: Particle, ratio: number, divBubble?: BubbleDiv): void {
    const container = this.container,
      modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

    if (modeSize === undefined) {
      return;
    }

    const pSize = particle.size.value,
      size = calculateBubbleValue(pSize, modeSize, particle.size.max, ratio);

    if (size !== undefined) {
      particle.bubble.radius = size;
    }
  }

  #process(particle: Particle, distMouse: number, timeSpent: number, data: Interfaces): void {
    const container = this.container,
      bubbleParam = data.bubbleObj.optValue,
      options = container.actualOptions,
      bubbleOptions = options.interactivity?.modes.bubble;

    if (!bubbleOptions || bubbleParam === undefined) {
      return;
    }

    const bubbleDuration = bubbleOptions.duration,
      bubbleDistance = container.retina.bubbleModeDistance,
      particlesParam = data.particlesObj.optValue,
      pObjBubble = data.bubbleObj.value,
      pObj = data.particlesObj.value ?? defaultBubbleValue,
      type = data.type;

    if (!bubbleDistance || bubbleDistance < minDistance || bubbleParam === particlesParam) {
      return;
    }

    container.bubble ??= {};

    if (container.bubble.durationEnd) {
      if (pObjBubble) {
        if (type === ProcessBubbleType.size) {
          delete particle.bubble.radius;
        }

        if (type === ProcessBubbleType.opacity) {
          delete particle.bubble.opacity;
        }
      }
    } else {
      if (distMouse <= bubbleDistance) {
        const obj = pObjBubble ?? pObj;

        if (obj !== bubbleParam) {
          const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;

          if (type === ProcessBubbleType.size) {
            particle.bubble.radius = value;
          }

          if (type === ProcessBubbleType.opacity) {
            particle.bubble.opacity = value;
          }
        }
      } else {
        if (type === ProcessBubbleType.size) {
          delete particle.bubble.radius;
        }

        if (type === ProcessBubbleType.opacity) {
          delete particle.bubble.opacity;
        }
      }
    }
  }

  #singleSelectorHover(interactivityData: IInteractivityData, delta: IDelta, selector: string, div: DivEvent): void {
    const container = this.container,
      selectors = safeDocument().querySelectorAll(selector),
      bubble = container.actualOptions.interactivity?.modes.bubble;

    if (!bubble || !selectors.length) {
      return;
    }

    selectors.forEach(item => {
      const elem = item as HTMLElement,
        pxRatio = container.retina.pixelRatio,
        pos = {
          x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
        },
        repulseRadius = elem.offsetWidth * half * pxRatio,
        area =
          div.type === DivType.circle
            ? new Circle(pos.x, pos.y, repulseRadius)
            : new Rectangle(
                elem.offsetLeft * pxRatio,
                elem.offsetTop * pxRatio,
                elem.offsetWidth * pxRatio,
                elem.offsetHeight * pxRatio,
              ),
        query = container.particles.grid.query(area, p => this.isEnabled(interactivityData, p));

      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }

        particle.bubble.inRange = true;

        const divs = bubble.divs,
          divBubble = divMode(divs, elem);

        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.clear(particle, delta, true);

          particle.bubble.div = elem;
        }

        /* size */
        this.#hoverBubbleSize(particle, defaultRatio, divBubble);

        /* opacity */
        this.#hoverBubbleOpacity(particle, defaultRatio, divBubble);

        /* color */
        this.#hoverBubbleColor(particle, defaultRatio, divBubble);
      }
    });
  }
}
