import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

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

export class Particles extends HTMLElement {
  #engine?: Engine;
  get engine(): Engine | undefined {
    return this.#engine;
  }
  set engine(value: Engine | undefined) {
    if (value === this.#engine) {
      return;
    }
    this.#engine = value;
    this.container.current?.destroy();
    if (this.isConnected) {
      void this.#loadParticles(++this.#loadId);
    }
  }

  // Observe 'url' and 'options' attributes so consumers can use setAttribute
  // (common in plain HTML demos) and the element updates its properties.
  static get observedAttributes(): string[] {
    return ["url", "options", "data-id", "data-theme"];
  }

  get id(): string {
    return super.id;
  }

  set id(value: string) {
    super.id = value;

    this.setAttribute("data-id", value);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
    // Avoid starting loads from attribute changes that occur before the
    // element is connected. When elements are constructed and attributes are
    // set (common in demos), attributeChangedCallback runs while the element
    // is still disconnected. Starting loads at that time can race with
    // connectedCallback and lead to overlapping engine.load calls that end up
    // destroying containers immediately after they're created. To avoid this
    // class of race, only call the public setters (which start loads) when the
    // element is connected. Otherwise store the value and let connectedCallback
    // initiate the load.
    if (name === "data-id") {
      super.id = newValue ?? "";

      if (this.isConnected) {
        this.container.current?.destroy();

        void this.#loadParticles(++this.#loadId);
      }
    } else if (name === "data-theme") {
      const container = this.container.current;

      if (container && newValue) {
        (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newValue);
      }
    } else if (name === "url") {
      // newValue can be null when the attribute is removed
      if (this.isConnected) {
        this.url = newValue;
      } else {
        this.#url = newValue;
      }
    } else if (name === "options") {
      if (newValue) {
        try {
          const parsed = JSON.parse(newValue);

          if (this.isConnected) {
            this.options = parsed as any;
          } else {
            this.#options = parsed as any;
          }
        } catch {
          // ignore malformed JSON
        }
      } else {
        if (this.isConnected) {
          this.options = undefined;
        } else {
          this.#options = undefined;
        }
      }
    }
  }
  get url(): string | null | undefined {
    return this.#url;
  }

  set url(value: string | null | undefined) {
    this.#url = value;

    // Note: setter triggers a reload when changed

    this.container.current?.destroy();

    void this.#loadParticles(++this.#loadId);
  }

  get options(): ISourceOptions | undefined {
    return this.#options;
  }

  set options(value: ISourceOptions | undefined) {
    this.#options = value;

    // Note: setter triggers a reload when changed

    this.container.current?.destroy();

    void this.#loadParticles(++this.#loadId);
  }

  #options?: ISourceOptions;
  #url?: string | null;
  #loadId = 0;

  public container: {
    current?: Container;
  };

  constructor() {
    super();

    this.container = {};

    const options = this.getAttribute("options");

    if (options) {
      try {
        this.#options = JSON.parse(options);
      } catch {}
    }
    this.#url = this.getAttribute("url");
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    // connected - start load when element is attached

    void this.#loadParticles(++this.#loadId);
  }

  disconnectedCallback(): void {
    this.#loadId++;
    this.container.current?.destroy();
    this.container.current = undefined;
  }

  async #loadParticles(currentLoadId: number): Promise<void> {
    // entering loadParticles

    try {
      const engine = this.engine;
      if (!engine) {
        return;
      }
      await waitForParticlesEngineInitialization(engine);

      if (!this.isConnected) {
        return;
      }

      let container: Container | undefined;

      if (this.#url) {
        // Normalize URL early and log for diagnostics so demo pages can
        // inspect what the wrapper sends to the engine when loads fail.
        let urlParam = this.#url;
        try {
          urlParam = new URL(urlParam as string, document.baseURI).toString();
        } catch (e) {
          // We'll let engine.load throw the original error.
        }

        // calling engine.load with the normalized url

        container = await engine?.load({
          id: this.id,
          element: this,
          url: urlParam,
        });
      } else if (this.#options) {
        // calling engine.load with inline options

        container = await engine?.load({
          id: this.id,
          element: this,
          options: this.#options,
        });
      }

      // after engine.load returned

      if (currentLoadId !== this.#loadId) {
        // Another load superseded us; destroy the stale container.
        container?.destroy();

        return;
      }

      await this.#notifyParticlesLoaded(container, currentLoadId);
    } catch (err) {
      // Prevent an unhandled rejection by catching load errors and exposing
      // them via events so the embedding page can surface diagnostics.
      const engine = (() => {
        try {
          return getGlobalEngine();
        } catch {
          return undefined;
        }
      })();

      const diagnostic = {
        message: err && (err as any).message ? (err as any).message : String(err),
        name: err && (err as any).name ? (err as any).name : undefined,
        stack: err && (err as any).stack ? (err as any).stack : undefined,
        url: this.#url,
        hasOptions: !!this.#options,
        enginePresent: !!engine,
        engineVersion: engine ? (engine as any).version : undefined,
        engineItemsLength: engine ? (engine as any).items?.length : undefined,
      } as const;

      try {
        this.dispatchEvent(
          new CustomEvent("particlesError", {
            detail: { original: err, diagnostic },
          }),
        );

        // Also dispatch a generic 'error' event for pages listening to that
        // event name (demo page attaches a listener named 'error').
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: { original: err, diagnostic },
          }),
        );
      } catch (e) {
        // swallow any dispatch errors
      }

      // Ensure the error is visible in the console for debugging.
      // eslint-disable-next-line no-console
      console.error("web-particles load error:", err, diagnostic);
    }
  }

  async #notifyParticlesLoaded(container: Container | undefined, currentLoadId: number): Promise<void> {
    this.container.current = container;

    const theme = this.getAttribute("data-theme");

    if (container && theme) {
      await (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
    }

    if (currentLoadId !== this.#loadId) {
      container?.destroy();

      return;
    }

    this.dispatchEvent(
      new CustomEvent("particlesLoaded", {
        detail: container,
      }),
    );
  }
}

// Do not auto-define the custom element at module load time. Defining an
// ES5-transpiled custom element must happen after the webcomponents
// polyfills (custom-elements-es5-adapter) are loaded in order to avoid
// "Constructor requires 'new' operator" errors in environments where the
// adapter is necessary. Consumers (the demo page) should call
// defineParticlesElement() after ensuring polyfills are present.
export function defineParticlesElement(): void {
  if (typeof customElements === "undefined") {
    // No customElements support in this environment.
    return;
  }

  if (!customElements.get("web-particles")) {
    customElements.define("web-particles", Particles as any);
  }
}
