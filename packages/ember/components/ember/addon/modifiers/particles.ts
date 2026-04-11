import Modifier, { NamedArgs, PositionalArgs } from 'ember-modifier';
import type { Container, Engine, Options } from 'tsparticles-engine';
import { tsParticles } from 'tsparticles-engine';

import { registerDestructor } from '@ember/destroyable';

interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      url: string;
      particlesInit: (engine: Engine) => void;
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
    }: NamedArgs<ParticlesModifierSignature>
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    tsParticles.init();

    if (particlesInit) {
      await particlesInit(tsParticles);
    }

    let container = await (url
      ? tsParticles.loadJSON(element.id, url)
      : tsParticles.load(element.id, options ?? {}));

    if (particlesLoaded && container) {
      particlesLoaded(container);
    }

    registerDestructor(this, () => {
      container?.destroy();
      container = undefined;
    });
  }
}
