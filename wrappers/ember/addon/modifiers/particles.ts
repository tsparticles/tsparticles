import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import type { Container, Options } from '@tsparticles/engine';
import { tsParticles } from '@tsparticles/engine';
import {
  initParticlesEngine,
  type ParticlesPluginRegistrar,
} from '../utils/init-particles-engine';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      url: string;
      particlesInit?: ParticlesPluginRegistrar;
      particlesLoaded: (container: Container) => void;
    };
  };
}

export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    {
      options,
      url,
      particlesInit,
      particlesLoaded,
    }: NamedArgs<ParticlesModifierSignature>,
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    await initParticlesEngine(particlesInit);

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
