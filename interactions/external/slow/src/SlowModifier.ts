import type { IParticleModifier } from "@tsparticles/engine";

/** Slow modifier implementing IParticleModifier for the slow interactor */
export class SlowModifier implements IParticleModifier {
  enabled = false;
  readonly id = "slow";
  readonly priority = 100;
  speedFactor = 1;
}
