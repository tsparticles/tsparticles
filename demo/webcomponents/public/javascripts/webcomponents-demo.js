// Bootloader for the webcomponents demo. This mirrors the inline script
// previously embedded in the demo view but lives in a static file so it's
// easier to develop and avoids large inline templates.

import("/@tsparticles/webcomponents/web-particles.js")
  .then(async mod => {
    try {
      // The classic full bundle exposes the factory and loader definitions.
      const waitForEngine = (timeout = 5000) =>
        new Promise(resolve => {
          if (globalThis.tsParticles?.createEngine && typeof globalThis.loadFull === "function") {
            resolve(true);
            return;
          }

          const start = Date.now();
          const poll = setInterval(() => {
            if (globalThis.tsParticles?.createEngine && typeof globalThis.loadFull === "function") {
              clearInterval(poll);
              resolve(true);
            } else if (Date.now() - start > timeout) {
              clearInterval(poll);
              resolve(false);
            }
          }, 100);
        });

      if (!(await waitForEngine(5000))) {
        throw new Error("The full tsParticles bundle did not expose the engine factory and loader.");
      }

      const engine = globalThis.tsParticles.createEngine();

      if (mod?.initParticlesEngine) {
        await mod.initParticlesEngine(engine, async engine => {
          await globalThis.loadFull(engine);
        });
      }

      // Wait for WebComponents polyfills (if any) to finish loading so that
      // defining ES5-transpiled custom elements (which may require the
      // custom-elements-es5-adapter) happens after the adapter is installed.
      const waitForWebComponents = (timeout = 5000) =>
        new Promise(resolve => {
          if (typeof window.customElements !== "undefined") {
            resolve(true);
            return;
          }

          const onReady = () => {
            resolve(true);
          };

          window.addEventListener("WebComponentsReady", onReady, { once: true });

          // Timeout fallback
          setTimeout(() => {
            window.removeEventListener("WebComponentsReady", onReady);
            resolve(false);
          }, timeout);
        });

      await waitForWebComponents(5000);

      if (typeof mod.defineParticlesElement === "function") {
        mod.defineParticlesElement();
      }

      // Create the element and append it to the document.
      const el = document.createElement("web-particles");
      el.id = "tsparticles";
      el.engine = engine;
      el.setAttribute("url", "/presets/default.json");
      document.body.appendChild(el);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("webcomponents demo bootstrap failed", err);
    }
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error("failed to import web-particles module", err);
  });
