/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, Vector, doublePI, getRandom, identity } from "@tsparticles/engine";
import type { BrownianPathParticle } from "./BrownianPathParticle.js";
import type { IBrownianPathOptions } from "./IBrownianPathOptions.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

/** Brownian motion path generator plugin */
export class BrownianPathGenerator implements IMovePathGenerator {
  /** Brownian path options */
  readonly options: IBrownianPathOptions;
  /** The particles container */
  readonly #container: Container;
  /** The result vector */
  readonly #res: Vector;

  /**
   * BrownianPathGenerator constructor
   * @param container - The container to handle
   */
  constructor(container: Container) {
    this.#container = container;
    this.#res = Vector.origin;

    this.options = {
      angleDelta: Math.PI / 12,
      damping: identity,
    };
  }

  /**
   * Generates the next movement vector for the particle
   * @param p - The particle
   * @returns The result
   */
  generate(p: BrownianPathParticle): Vector {
    p.brownian ??= {
      angle: getRandom() * doublePI,
      speed: p.velocity.length,
    };

    const b = p.brownian,
      delta = (getRandom() * 2 - 1) * (this.options.angleDelta ?? 0);

    b.angle += delta;

    const damping = this.options.damping ?? identity;

    p.velocity.x = 0;
    p.velocity.y = 0;

    this.#res.length = b.speed * damping;
    this.#res.angle = b.angle;

    return this.#res;
  }

  /** Initializes the path generator options */
  init(): void {
    const source = this.#container.actualOptions.particles.move.path.options;

    this.options.angleDelta = (source["angleDelta"] as number | undefined) ?? this.options.angleDelta;
    this.options.damping = (source["damping"] as number | undefined) ?? this.options.damping;
  }

  /**
   * Resets the particle brownian state
   * @param p - The particle
   */
  reset(p: BrownianPathParticle): void {
    delete p.brownian;
  }

  /** Updates the path generator (no-op) */
  update(): void {
    // nothing to do
  }
}
