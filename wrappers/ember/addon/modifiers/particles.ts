import Modifier from 'ember-modifier';
import type { NamedArgs, PositionalArgs } from 'ember-modifier';
import type { Container, Options } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';
import {
  isParticlesEngineInitialized,
  waitForParticlesEngineInitialization,
} from '../utils/init-particles-engine';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
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

  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options, url, particlesLoaded, theme }: NamedArgs<ParticlesModifierSignature>,
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    await waitForParticlesEngineInitialization();

    if (!isParticlesEngineInitialized()) {
      throw new Error(
        'initParticlesEngine(...) must be called once before rendering <Particles /> components.',
      );
    }

    this.#container?.destroy();
    this.#container = undefined;

    let container = await tsParticles.load({
      id: element.id,
      options: options ?? {},
      url,
    });

    this.#container = container;

    if (container && theme) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
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
