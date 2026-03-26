import { defaultRatio, defaultReduceFactor } from "./Utils/Constants.js";
import type { Particle } from "./Particle.js";
import { getRangeValue } from "../Utils/MathUtils.js";

/**
 */
export class Retina {
  pixelRatio: number;
  reduceFactor: number;

  constructor() {
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }

  /**
   * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
   * @param detectRetina -
   */
  init(detectRetina = true): void {
    this.reduceFactor = defaultReduceFactor;
    this.pixelRatio = detectRetina ? devicePixelRatio : defaultRatio;
  }

  initParticle(particle: Particle): void {
    const { options } = particle,
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
