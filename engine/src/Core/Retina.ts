import { defaultRatio, defaultReduceFactor } from "./Utils/Constants.js";
import type { Container } from "./Container.js";
import type { Particle } from "./Particle.js";
import { getRangeValue } from "../Utils/MathUtils.js";

/**
 */
export class Retina {
  maxSpeed!: number;
  pixelRatio: number;
  reduceFactor: number;
  sizeAnimationSpeed!: number;

  private readonly _container;

  constructor(container: Container) {
    this._container = container;
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }

  /**
   * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
   */
  init(): void {
    const container = this._container,
      options = container.actualOptions;

    this.reduceFactor = defaultReduceFactor;
    this.pixelRatio = options.detectRetina ? devicePixelRatio : defaultRatio;

    const ratio = this.pixelRatio,
      canvas = container.canvas,
      particles = options.particles,
      moveOptions = particles.move;

    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;

    if (canvas.domElement) {
      canvas.size.width = canvas.domElement.offsetWidth * ratio;
      canvas.size.height = canvas.domElement.offsetHeight * ratio;
    }
  }

  initParticle(particle: Particle): void {
    const options = particle.options,
      ratio = this.pixelRatio,
      moveOptions = options.move,
      moveDistance = moveOptions.distance,
      props = particle.retina,
      maxDistance = props.maxDistance;

    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;

    maxDistance.horizontal = moveDistance.horizontal === undefined ? undefined : moveDistance.horizontal * ratio;
    maxDistance.vertical = moveDistance.vertical === undefined ? undefined : moveDistance.vertical * ratio;
  }
}
