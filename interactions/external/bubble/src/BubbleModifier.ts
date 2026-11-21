import type { IOklcha, IParticleModifier } from "@tsparticles/engine";

/** Bubble modifier implementing IParticleModifier for the bubble interactor */
export class BubbleModifier implements IParticleModifier {
  div?: HTMLElement;
  enabled = false;
  fillColor?: IOklcha;
  finalColor?: IOklcha;
  readonly id = "bubble";
  inRange = false;
  opacity?: number;
  readonly priority = 100;
  radius?: number;
  strokeColor?: IOklcha;
}
