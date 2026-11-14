import { render, type TestContext } from '@ember/test-helpers';
import { LINK_OPTIONS } from 'dummy/tests/helpers/particles';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { initParticlesEngine } from '@tsparticles/ember/utils/init-particles-engine';
import { loadFull } from 'tsparticles';

import type { Container, Engine } from '@tsparticles/engine';
import { createEngine } from '@tsparticles/engine';
import { loadSnowPreset } from '@tsparticles/preset-snow';

interface Context extends TestContext {
  engine: Engine;
  id: string;
  url: string;
  options: object;
  particlesLoaded: (container: Container) => void;
}

const SELECTORS = {
  PARTICLES: '[data-test-id="particles"]',
};

module('Integration | Component | particles', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function (this: Context) {
    for (const container of [...this.engine.items]) {
      container.destroy();
    }
    sinon.restore();
  });

  hooks.beforeEach(async function (this: Context) {
    this.engine = createEngine();
    await initParticlesEngine(this.engine, async (engine: Engine) => {
      await loadFull(engine);
      await loadSnowPreset(engine);
    });
  });

  test('generates a unique id', async function (this: Context, assert) {
    await render(hbs`<Particles @engine={{this.engine}} />`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id');
  });

  test('can be assigned a custom id', async function (this: Context, assert) {
    this.id = 'custom-id';
    await render(hbs`<Particles @engine={{this.engine}} id={{this.id}}/>`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id', this.id);
  });

  test('calls load when passing a config object', async function (this: Context, assert) {
    const loadSpy = sinon.spy(this.engine, 'load');
    this.options = LINK_OPTIONS;
    await render(
      hbs`<Particles @engine={{this.engine}} @options={{this.options}}/>`,
    );

    assert.true(loadSpy.calledOnce, 'tsparticles engine load has been called');
  });

  test('calls load when passing an url', async function (this: Context, assert) {
    const loadSpy = sinon.stub(this.engine, 'load');
    this.url = 'https://example.com/config.json';
    await render(hbs`<Particles @engine={{this.engine}} @url={{this.url}}/>`);

    assert.true(loadSpy.calledOnce, 'tsparticles engine load has been called');
  });

  test('calls the loaded callback', async function (this: Context, assert) {
    assert.expect(0);
    const done = assert.async();

    this.options = LINK_OPTIONS;
    this.particlesLoaded = () => {
      done();
    };
    await render(
      hbs`
      <Particles @engine={{this.engine}}
        @options={{this.options}}
        @particlesLoaded={{this.particlesLoaded}}
      />`,
    );
  });

  test('can load presets', async function (this: Context, assert) {
    assert.expect(0);
    const done = assert.async();

    this.options = {
      preset: 'snow',
    };
    this.particlesLoaded = () => {
      done();
    };
    await render(
      hbs`
      <Particles @engine={{this.engine}}
        @options={{this.options}}
        @particlesLoaded={{this.particlesLoaded}}
      />`,
    );
  });
});
