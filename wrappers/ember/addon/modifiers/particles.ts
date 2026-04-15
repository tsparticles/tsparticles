import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
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
      particlesLoaded: (container: Container) => void;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options, url, particlesLoaded }: NamedArgs<ParticlesModifierSignature>,
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

    let container = await tsParticles.load({
      id: element.id,
      options: options ?? {},
      url,
    });

    if (particlesLoaded && container) {
      particlesLoaded(container);
    }

    registerDestructor(this, () => {
      container?.destroy();
      container = undefined;
    });
  }
}
