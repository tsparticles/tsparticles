import {
  CachePolicy,
  type Container,
  EffectLayer,
  type IEffectDrawer,
  type IParticlesOptions,
  type IShapeDrawData,
  type IShapeValues,
  type ITextureMetadata,
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

interface IParticlesRateData {
  delay: RangeValue;
  quantity: RangeValue;
}

interface ISpanParticlesData {
  particles?: RecursivePartial<IParticlesOptions>;
  rate?: IParticlesRateData;
}

interface IParticlesData extends IShapeValues {
  spawn?: ISpanParticlesData;
}

type ParticlesParticle = Particle & {
  particlesData?: IParticlesData;
  particlesNextSpawn?: number;
  particlesSpawnQuantity?: number;
  particlesSpawnRate?: number;
};

export class ParticlesDrawer implements IEffectDrawer<ParticlesParticle> {
  drawAfter(data: IShapeDrawData<ParticlesParticle>): void {
    const { particle } = data,
      { container } = particle;

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

  getDescriptor(particle: ParticlesParticle): string {
    const rate = particle.particlesSpawnRate ?? defaultSpawnRate,
      quantity = particle.particlesSpawnQuantity ?? defaultSpawnQuantity;

    return `particles:${rate}:${quantity}`;
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Dynamic,
      effectLayer: EffectLayer.External,
    };
  }

  particleInit(_container: Container, particle: ParticlesParticle): void {
    const effectData = particle.effectData as IParticlesData | undefined,
      spawnRate = getRangeValue(effectData?.spawn?.rate?.delay ?? defaultSpawnRate);

    particle.particlesSpawnQuantity = getRangeValue(effectData?.spawn?.rate?.quantity ?? defaultSpawnQuantity);
    particle.particlesSpawnRate = (spawnRate > minSpawnRate ? spawnRate : defaultSpawnRate) * millisecondsToSeconds;
    particle.particlesNextSpawn = performance.now() + particle.particlesSpawnRate;
    particle.particlesData = effectData;
  }
}
