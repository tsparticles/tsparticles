import { Container, Engine, ISourceOptions, getLogger } from "@tsparticles/engine";
import { LitElement, PropertyValues, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

type InitializationState = {
  loaded: boolean;
  started: boolean;
  promise: Promise<void>;
  resolve: () => void;
  reject: (error: unknown) => void;
};

const states = new WeakMap<Engine, InitializationState>();

function getInitializationState(engine: Engine): InitializationState {
  const existing = states.get(engine);
  if (existing) {
    return existing;
  }
  let resolve = (): void => {},
    reject: (error: unknown) => void = () => {};
  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  const state = { loaded: false, started: false, promise, resolve, reject };
  states.set(engine, state);
  return state;
}

export async function initParticlesEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void> {
  const state = getInitializationState(engine);
  if (!state.started) {
    state.started = true;
    void Promise.resolve()
      .then(async () => {
        await init?.(engine);
        await engine.init();
        state.loaded = true;
        state.resolve();
      })
      .catch((error: unknown) => {
        states.delete(engine);
        state.reject(error);
      });
  }
  return state.promise;
}

export function isParticlesEngineInitialized(engine: Engine): boolean {
  return states.get(engine)?.loaded ?? false;
}

export async function waitForParticlesEngineInitialization(engine: Engine): Promise<void> {
  await getInitializationState(engine).promise;
}

/**
 * The LitParticles element.
 *
 * @id - This element has an id
 */
@customElement("lit-particles")
export class LitParticles extends LitElement {
  @property({ attribute: false })
  engine?: Engine;
  /**
   * Render into light DOM so tsParticles can find the container element by id.
   * @returns The result
   */
  createRenderRoot(): HTMLElement {
    return this;
  }

  /**
   * The container id
   */
  @property({ type: String })
  id = "tsparticles";

  /**
   * The options
   */
  @property({ type: Object })
  options?: ISourceOptions;

  /**
   * The url
   */
  @property({ type: String })
  url?: string;

  /**
   * The theme name (requires @tsparticles/plugin-themes)
   */
  @property({ type: String })
  theme?: string;

  container?: Container;

  #firstUpdate = true;

  #renderId = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.requestUpdate();
  }

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (!this.isConnected) {
      return;
    }

    if (
      this.#firstUpdate ||
      changedProperties.has("engine") ||
      changedProperties.has("options") ||
      changedProperties.has("url") ||
      changedProperties.has("id")
    ) {
      this.#firstUpdate = false;

      const renderId = ++this.#renderId;

      void this.#loadParticles(renderId).catch((error: unknown) => {
        if (renderId === this.#renderId) {
          getLogger().error("LitParticles: error loading particles", error);
        }
      });
    }

    if (changedProperties.has("theme") && this.container) {
      void this.#loadTheme(this.container);
    }
  }

  disconnectedCallback(): void {
    this.#renderId++;
    this.#firstUpdate = true;
    this.container?.destroy();
    this.container = undefined;

    super.disconnectedCallback();
  }

  async #loadParticles(currentRenderId: number): Promise<void> {
    const engine = this.engine;
    if (!engine) {
      return;
    }
    await waitForParticlesEngineInitialization(engine);

    if (currentRenderId !== this.#renderId) {
      return;
    }

    if (!isParticlesEngineInitialized(engine)) {
      throw new Error("initParticlesEngine(...) must be called once before rendering <lit-particles /> components.");
    }

    const id = this.id ?? "tsparticles";

    this.container?.destroy();
    this.container = undefined;

    let container: Container | undefined;

    if (this.options) {
      container = await engine.load({ id, element: this, options: this.options });
    } else if (this.url) {
      container = await engine.load({ id, element: this, url: this.url });
    } else {
      throw new Error("No options or url provided");
    }

    if (currentRenderId !== this.#renderId) {
      container?.destroy();

      return;
    }

    this.container = container;

    if (container) {
      if (this.theme) {
        void this.#loadTheme(container);
      }

      this.dispatchEvent(
        new CustomEvent("particlesLoaded", {
          detail: container,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  async #loadTheme(container: Container): Promise<void> {
    try {
      await (container as Container & { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
    } catch (error: unknown) {
      if (this.container === container) {
        getLogger().error("LitParticles: error loading theme", error);
      }
    }
  }

  render() {
    return html`${keyed(
      this.id,
      html`<div id=${this.id}>
        <canvas></canvas>
      </div>`,
    )}`;
  }
}
