import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

// Runtime engine instance is read from globalThis.tsParticles. We avoid a
// runtime import of the engine here so the webcomponents wrapper doesn't
// bundle its own engine and accidentally overwrite a globally loaded
// engine (for example the tsparticles bundle). Consumers must expose the
// engine on globalThis.tsParticles (see README).
function getGlobalEngine(): Engine | undefined {
  return (globalThis as any).tsParticles as Engine | undefined;
}

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;

  const engine = getGlobalEngine();

  if (!engine) {
    throw new Error(
      "tsParticles engine not found. Load @tsparticles/engine (or the tsparticles bundle) and assign it to globalThis.tsParticles before calling initParticlesEngine().",
    );
  }

  initPromise = (async () => {
    if (init) {
      await init(engine);
    }

    // Some engine builds expose an async init() to complete setup (plugins, presets)
    if (typeof (engine as any).init === "function") {
      await (engine as any).init();
    }

    initialized = true;
  })().catch((error: unknown) => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
  // Consider the engine initialized if either initParticlesEngine completed
  // or a global tsParticles instance is present (the full bundle sets
  // globalThis.tsParticles). This makes the wrapper tolerant when the
  // bundled engine is loaded via a script tag and plugins are already
  // included.
  return initialized || !!getGlobalEngine();
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
  await (initPromise ?? Promise.resolve());
}

export class Particles extends HTMLElement {
  // Observe 'url' and 'options' attributes so consumers can use setAttribute
  // (common in plain HTML demos) and the element updates its properties.
  static get observedAttributes(): string[] {
    return ["url", "options"];
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
    if (name === "url") {
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

    // Dispatch the engine that's actually available at runtime (if any).
    try {
      this.dispatchEvent(
        new CustomEvent("particlesInit", {
          detail: getGlobalEngine(),
        }),
      );
    } catch {
      // ignore dispatch errors during construction
    }

    // If a global engine is already present (the full bundle was loaded via
    // a script tag), start initialization automatically so the element can
    // proceed without the app having to call initParticlesEngine() explicitly.
    // This is a best-effort convenience for the demo pages.
    try {
      const engine = getGlobalEngine();

      if (engine && !initialized && !initPromise) {
        // fire-and-forget; loadParticles will await the initPromise when it runs
        void initParticlesEngine();
      }
    } catch (e) {
      // swallow: initialization is optional here and will be handled by the
      // consumer when needed
    }
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
      await waitForParticlesEngineInitialization();

      // Prefer a global engine if present, otherwise fail if the library hasn't
      // been initialized via initParticlesEngine().
      const engine = getGlobalEngine();

      if (!isParticlesEngineInitialized() && !engine) {
        throw new Error("initParticlesEngine(...) must be called once before rendering <web-particles /> components.");
      }

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

      this.#notifyParticlesLoaded(container);
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

  #notifyParticlesLoaded(container?: Container): void {
    this.container.current = container;

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
