import type { IHsl } from "./Colors.js";

/** Particle modifier interface for dynamic property overrides */
export interface IParticleModifier {
  /** Whether this modifier is active */
  readonly enabled: boolean;
  /** Modified fill color override */
  readonly fillColor?: IHsl;
  /** Unique identifier for this modifier (used to remove it later) */
  readonly id: string;
  /** Modified opacity override */
  readonly opacity?: number;
  /** Priority: higher number = applied later (overrides lower priorities) */
  readonly priority: number;
  /** Modified radius override */
  readonly radius?: number;
  /** Modified movement speed factor override */
  readonly speedFactor?: number;
  /** Modified stroke color override */
  readonly strokeColor?: IHsl;
}
