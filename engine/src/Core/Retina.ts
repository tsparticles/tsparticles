import { defaultRatio, defaultReduceFactor } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import type { Particle } from "./Particle.js";
import { getRangeValue } from "../Utils/MathUtils.js";

/**
 */
export class Retina {
  pixelRatio: number;
  reduceFactor: number;

  constructor(private readonly container: Container) {
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }

  /**
   * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
   */
  init(): void {
    const container = this.container,
      options = container.actualOptions;

    this.pixelRatio = options.detectRetina ? devicePixelRatio : defaultRatio;
    this.reduceFactor = defaultReduceFactor;

    const ratio = this.pixelRatio,
      canvas = container.canvas;

    if (canvas.element) {
      const element = canvas.element;

      canvas.size.width = element.offsetWidth * ratio;
      canvas.size.height = element.offsetHeight * ratio;
    }
  }

  initParticle(particle: Particle): void {
    const options = particle.options,
      ratio = this.pixelRatio,
      moveOptions = options.move,
      moveDistance = moveOptions.distance,
      props = particle.retina;

    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;

    const maxDistance = props.maxDistance;

    maxDistance.horizontal = moveDistance.horizontal === undefined ? undefined : moveDistance.horizontal * ratio;
    maxDistance.vertical = moveDistance.vertical === undefined ? undefined : moveDistance.vertical * ratio;
  }
}
