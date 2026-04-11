import { render, TestContext } from '@ember/test-helpers';
import { LINK_OPTIONS } from 'dummy/tests/helpers/particles';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';
import { loadFull } from 'tsparticles';

import { Container, Engine, tsParticles } from 'tsparticles-engine';
import { loadSnowPreset } from 'tsparticles-preset-snow';

interface Context extends TestContext {
  id: string;
  url: string;
  options: Object;
  particlesInit: (engine: Engine) => void;
  particlesLoaded: (container: Container) => void;
}

const SELECTORS = {
  PARTICLES: '[data-test-id="particles"]',
};

module('Integration | Component | particles', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    sinon.restore();
  });

  test('generates a unique id', async function (this: Context, assert) {
    await render(hbs`<Particles />`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id');
  });

  test('can be assigned a custom id', async function (this: Context, assert) {
    this.id = 'custom-id';
    await render(hbs`<Particles id={{this.id}}/>`);

    assert.dom(SELECTORS.PARTICLES).hasAttribute('id', this.id);
  });

  test('calls load when passing a config object', async function (this: Context, assert) {
    const loadSpy = sinon.spy(tsParticles, 'load');
    this.options = LINK_OPTIONS;
    await render(hbs`<Particles @options={{this.options}}/>`);

    assert.true(loadSpy.calledOnce, 'tsparticles engine load has been called');
  });

  test('calls loadJSON when passing an url', async function (this: Context, assert) {
    const loadJSONSpy = sinon.stub(tsParticles, 'loadJSON');
    this.url = 'https://example.com/config.json';
    await render(hbs`<Particles @url={{this.url}}/>`);

    assert.true(
      loadJSONSpy.calledOnce,
      'tsparticles engine load has been called'
    );
  });

  test('calls the init callback', async function (this: Context, assert) {
    this.options = LINK_OPTIONS;
    this.particlesInit = () => {};
    const particlesInitSpy = sinon.spy(this, 'particlesInit');
    await render(
      hbs`<Particles @options={{this.options}} @particlesInit={{this.particlesInit}}/>`
    );

    assert.true(
      particlesInitSpy.calledOnce,
      'the init callback has been called'
    );
  });

  test('calls the loaded callback', async function (this: Context, assert) {
    assert.expect(0);
    const done = assert.async();

    this.options = LINK_OPTIONS;
    this.particlesInit = async (engine) => {
      await loadFull(engine);
    };
    this.particlesLoaded = () => {
      done();
    };
    await render(
      hbs`
      <Particles
        @options={{this.options}}
        @particlesInit={{this.particlesInit}}
        @particlesLoaded={{this.particlesLoaded}}
      />`
    );
  });

  test('can load presets', async function (this: Context, assert) {
    assert.expect(0);
    const done = assert.async();

    this.options = {
      preset: 'snow',
    };
    this.particlesInit = async (engine) => {
      await loadSnowPreset(engine);
    };
    this.particlesLoaded = () => {
      done();
    };
    await render(
      hbs`
      <Particles
        @options={{this.options}}
        @particlesInit={{this.particlesInit}}
        @particlesLoaded={{this.particlesLoaded}}
      />`
    );
  });
});
