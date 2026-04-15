import Controller from '@ember/controller';
import { Container, Engine } from '@tsparticles/engine';
import { loadSnowPreset } from '@tsparticles/preset-snow';
import { tracked } from '@glimmer/tracking';
import { CONFETTI_OPTIONS, LINK_OPTIONS } from '../utils/options';
import { loadFull } from 'tsparticles';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';

export default class ApplicationController extends Controller {
  @tracked isConfettiVisible = false;

  options = LINK_OPTIONS;

  confetti = CONFETTI_OPTIONS;

  constructor(...args: unknown[]) {
    super(...args);

    void initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
      await loadSnowPreset(engine);
    });
  }

  loadedCallback(container: Container) {
    console.log(
      'A callback function can be passed which triggers when the particles are loaded',
      container,
    );
  }
}
