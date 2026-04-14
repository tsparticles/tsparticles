import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  type PluginManager,
  type RecursivePartial,
  getRangeValue,
  percentDenominator,
} from "@tsparticles/engine";
import type { DestroyParticle, DestroyParticlesOptions, IDestroyParticlesOptions } from "./Types.js";
import { Destroy } from "./Options/Classes/Destroy.js";
import { DestroyMode } from "./Enums/DestroyMode.js";
import { split } from "./Utils.js";

const defaultDeltaFactor = 1,
  fpsFactor = 60,
  minExplodeSpeed = 0.01,
  maxExplodeProgress = 1;

export class DestroyUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this._container = container;
    this._pluginManager = pluginManager;
  }

  init(particle: DestroyParticle): void {
    const container = this._container,
      particlesOptions = particle.options,
      destroyOptions = particlesOptions.destroy;

    if (!destroyOptions) {
      return;
    }

    particle.explode = undefined;

    particle.splitCount = 0;

    const destroyBoundsOptions = destroyOptions.bounds;

    particle.destroyBounds ??= {};

    const { bottom, left, right, top } = destroyBoundsOptions,
      { destroyBounds } = particle,
      canvasSize = container.canvas.size;

    if (bottom) {
      destroyBounds.bottom = (getRangeValue(bottom) * canvasSize.height) / percentDenominator;
    }

    if (left) {
      destroyBounds.left = (getRangeValue(left) * canvasSize.width) / percentDenominator;
    }

    if (right) {
      destroyBounds.right = (getRangeValue(right) * canvasSize.width) / percentDenominator;
    }

    if (top) {
      destroyBounds.top = (getRangeValue(top) * canvasSize.height) / percentDenominator;
    }
  }

  isEnabled(particle: Particle): boolean {
    const destroyParticle = particle as DestroyParticle;

    return !destroyParticle.destroyed || !!destroyParticle.explode;
  }

  loadOptions(
    options: DestroyParticlesOptions,
    ...sources: (RecursivePartial<IDestroyParticlesOptions> | undefined)[]
  ): void {
    options.destroy ??= new Destroy();

    for (const source of sources) {
      options.destroy.load(source?.destroy);
    }
  }

  particleDestroyed(particle: DestroyParticle, override?: boolean): void {
    if (override) {
      return;
    }

    const destroyOptions = particle.options.destroy;

    switch (destroyOptions?.mode) {
      case DestroyMode.split:
        split(this._pluginManager, this._container, particle);

        break;
      case DestroyMode.explode: {
        if (particle.explode) {
          break;
        }

        const { explode } = destroyOptions,
          initialSize = particle.size.value,
          maxSize = initialSize * explode.maxSizeFactor,
          opacity = particle.getOpacity();

        particle.explode = {
          initialFillOpacity: opacity.fillOpacity,
          initialSize,
          initialStrokeOpacity: opacity.strokeOpacity,
          maxSize,
          progress: 0,
          speed: Math.max(explode.speed, minExplodeSpeed),
        };

        particle.fillOpacity = opacity.fillOpacity;
        particle.strokeOpacity = opacity.strokeOpacity;
        particle.destroyed = false;

        break;
      }
      default:
        break;
    }
  }

  update(particle: DestroyParticle, delta: IDelta): void {
    if (particle.explode) {
      const explode = particle.explode,
        deltaFactor = delta.factor || defaultDeltaFactor;

      explode.progress = Math.min(maxExplodeProgress, explode.progress + (explode.speed * deltaFactor) / fpsFactor);

      const progress = explode.progress;

      particle.size.value = explode.initialSize + (explode.maxSize - explode.initialSize) * progress;
      particle.fillOpacity = explode.initialFillOpacity * (maxExplodeProgress - progress);
      particle.strokeOpacity = explode.initialStrokeOpacity * (maxExplodeProgress - progress);

      if (progress >= maxExplodeProgress) {
        particle.explode = undefined;
        particle.destroy(true);
      }

      return;
    }

    if (particle.unbreakableUntil !== undefined && performance.now() >= particle.unbreakableUntil) {
      particle.unbreakable = false;
      particle.unbreakableUntil = undefined;
    }

    const position = particle.getPosition(),
      bounds = particle.destroyBounds;

    if (!bounds) {
      return;
    }

    if (
      (bounds.bottom !== undefined && position.y >= bounds.bottom) ||
      (bounds.left !== undefined && position.x <= bounds.left) ||
      (bounds.right !== undefined && position.x >= bounds.right) ||
      (bounds.top !== undefined && position.y <= bounds.top)
    ) {
      particle.destroy();
    }
  }
}
