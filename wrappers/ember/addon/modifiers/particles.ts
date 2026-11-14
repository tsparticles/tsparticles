import type { Container, Engine, Options } from '@tsparticles/engine';
import type { NamedArgs, PositionalArgs } from 'ember-modifier';
import {
  isParticlesEngineInitialized,
  waitForParticlesEngineInitialization,
} from '../utils/init-particles-engine';
import Modifier from 'ember-modifier';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      engine: Engine;
      options: Options;
      url: string;
      particlesLoaded: (container?: Container) => void;
      theme?: string;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  #container?: Container;
  #cleanupRegistered = false;
  #executionGeneration = 0;

  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    {
      engine,
      options,
      url,
      particlesLoaded,
      theme,
    }: NamedArgs<ParticlesModifierSignature>,
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    await waitForParticlesEngineInitialization(engine);

    if (!isParticlesEngineInitialized(engine)) {
      throw new Error(
        'initParticlesEngine(...) must be called once before rendering <Particles /> components.',
      );
    }

    this.#executionGeneration++;
    const executionGeneration = this.#executionGeneration;

    this.#container?.destroy();
    this.#container = undefined;

    const container = await engine.load({
      id: element.id,
      options: options ?? {},
      url,
    });

    // A superseded execution resolved first and overwrote #container; discard its result.
    if (executionGeneration !== this.#executionGeneration) {
      container?.destroy();
      return;
    }

    this.#container = container;

    if (container && theme) {
      (
        container as unknown as { loadTheme?: (name?: string) => Promise<void> }
      ).loadTheme?.(theme);
    }

    if (particlesLoaded && container) {
      particlesLoaded(container);
    }

    if (!this.#cleanupRegistered) {
      registerDestructor(this, () => {
        this.#container?.destroy();
        this.#container = undefined;
      });
      this.#cleanupRegistered = true;
    }
  }
}
