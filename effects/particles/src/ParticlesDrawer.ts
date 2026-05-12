import {
  type Container,
  type IEffectDrawer,
  type IParticlesOptions,
  type IShapeDrawData,
  type IShapeValues,
  type Particle,
  type RangeValue,
  type RecursivePartial,
  deepExtend,
  getRangeValue,
  millisecondsToSeconds,
} from "@tsparticles/engine";

const minSpawnRate = 0,
  defaultSpawnRate = 1,
  defaultSpawnQuantity = 1;

/** Particles spawn rate data */
export interface IParticlesRateData {
  /** Delay between spawns */
  delay: RangeValue;
  /** Number of particles per spawn */
  quantity: RangeValue;
}

/** Particles spawn data */
export interface ISpawnParticlesData {
  /** Particles options to spawn */
  particles?: RecursivePartial<IParticlesOptions>;
  /** Spawn rate configuration */
  rate?: IParticlesRateData;
}

/**
 * Particles effect shape data
 */
export interface IParticlesData extends IShapeValues {
  /** Spawn configuration */
  spawn?: ISpawnParticlesData;
}

/**
 * Particles effect particle extension type
 */
export type ParticlesParticle = Particle & {
  /** Effect data */
  effectData?: IParticlesData;
  /** Particles data for spawning */
  particlesData?: IParticlesData;
  /** Next spawn time */
  particlesNextSpawn?: number;
  /** Number of particles to spawn each time */
  particlesSpawnQuantity?: number;
  /** Spawn rate in ms */
  particlesSpawnRate?: number;
};

/** Particles spawning effect drawer plugin */
export class ParticlesDrawer implements IEffectDrawer<ParticlesParticle> {
  /** The particles container */
  private readonly _container;

  /**
   * ParticlesDrawer constructor
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
  }

  /**
   * Spawns new particles after rendering
   * @param data
   */
  drawAfter(data: IShapeDrawData<ParticlesParticle>): void {
    const { particle } = data,
      { _container: container } = this;

    if (!particle.particlesNextSpawn) {
      return;
    }

    const currentTime = performance.now();

    if (currentTime < particle.particlesNextSpawn) {
      return;
    }

    particle.particlesNextSpawn =
      currentTime + (particle.particlesSpawnRate ?? defaultSpawnRate * millisecondsToSeconds);

    const quantity = particle.particlesSpawnQuantity ?? defaultSpawnQuantity,
      pOptions = deepExtend({}, particle.particlesData?.spawn?.particles) as RecursivePartial<IParticlesOptions>,
      pos = { ...particle.getPosition() };

    for (let i = 0; i < quantity; i++) {
      container.particles.addParticle(pos, pOptions);
    }
  }

  /**
   * Initializes the particle spawner properties
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: ParticlesParticle): void {
    const effectData = particle.effectData,
      spawnRate = getRangeValue(effectData?.spawn?.rate?.delay ?? defaultSpawnRate);

    particle.particlesSpawnQuantity = getRangeValue(effectData?.spawn?.rate?.quantity ?? defaultSpawnQuantity);
    particle.particlesSpawnRate = (spawnRate > minSpawnRate ? spawnRate : defaultSpawnRate) * millisecondsToSeconds;
    particle.particlesNextSpawn = performance.now() + particle.particlesSpawnRate;
    particle.particlesData = effectData;
  }
}
