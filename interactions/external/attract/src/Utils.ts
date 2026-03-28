import {
  type BaseRange,
  Circle,
  type ICoordinates,
  type Particle,
  type PluginManager,
  Vector,
  clamp,
  getDistances,
  identity,
} from "@tsparticles/engine";
import type { AttractContainer } from "./Types.js";
import type { IInteractivityData } from "@tsparticles/plugin-interactivity";

const minFactor = 1,
  minRadius = 0,
  updateVector = Vector.origin;

/**
 *
 * @param pluginManager -
 * @param container -
 * @param position -
 * @param attractRadius -
 * @param area -
 * @param queryCb -
 */
function processAttract(
  pluginManager: PluginManager,
  container: AttractContainer,
  position: ICoordinates,
  attractRadius: number,
  area: BaseRange,
  queryCb: (p: Particle) => boolean,
): void {
  const attractOptions = container.actualOptions.interactivity?.modes.attract;

  if (!attractOptions) {
    return;
  }

  const query = container.particles.grid.query(area, queryCb);

  for (const particle of query) {
    const { dx, dy, distance } = getDistances(particle.position, position),
      velocity = attractOptions.speed * attractOptions.factor,
      attractFactor = clamp(
        pluginManager.getEasing(attractOptions.easing)(identity - distance / attractRadius) * velocity,
        minFactor,
        attractOptions.maxSpeed,
      );

    updateVector.x = !distance ? velocity : (dx / distance) * attractFactor;
    updateVector.y = !distance ? velocity : (dy / distance) * attractFactor;

    particle.position.subFrom(updateVector);
  }
}

/**
 * @param pluginManager -
 * @param container -
 * @param interactivityData -
 * @param enabledCb -
 */
export function clickAttract(
  pluginManager: PluginManager,
  container: AttractContainer,
  interactivityData: IInteractivityData,
  enabledCb: (particle: Particle) => boolean,
): void {
  container.attract ??= { particles: [] };

  const { attract } = container;

  if (!attract.finish) {
    attract.count ??= 0;
    attract.count++;

    if (attract.count === container.particles.count) {
      attract.finish = true;
    }
  }

  if (attract.clicking) {
    const mousePos = interactivityData.mouse.clickPosition,
      attractRadius = container.retina.attractModeDistance;

    if (!attractRadius || attractRadius < minRadius || !mousePos) {
      return;
    }

    processAttract(
      pluginManager,
      container,
      mousePos,
      attractRadius,
      new Circle(mousePos.x, mousePos.y, attractRadius),
      (p: Particle) => enabledCb(p),
    );
  } else if (attract.clicking === false) {
    attract.particles = [];
  }
}

/**
 * @param pluginManager -
 * @param container -
 * @param interactivityData -
 * @param enabledCb -
 */
export function hoverAttract(
  pluginManager: PluginManager,
  container: AttractContainer,
  interactivityData: IInteractivityData,
  enabledCb: (particle: Particle) => boolean,
): void {
  const mousePos = interactivityData.mouse.position,
    attractRadius = container.retina.attractModeDistance;

  if (!attractRadius || attractRadius < minRadius || !mousePos) {
    return;
  }

  processAttract(
    pluginManager,
    container,
    mousePos,
    attractRadius,
    new Circle(mousePos.x, mousePos.y, attractRadius),
    (p: Particle) => enabledCb(p),
  );
}
