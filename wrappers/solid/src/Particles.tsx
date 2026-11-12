import { getLogger, tsParticles, type Container } from "@tsparticles/engine";
import { For, JSX, createEffect, createMemo, createSignal, mergeProps, onCleanup, untrack } from "solid-js";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

const Particles = (props: IParticlesProps): JSX.Element => {
  const merged = mergeProps({ id: "tsparticles" }, props);

  const [container, setContainer] = createSignal<Container | undefined>();
  let loadId = 0;

  const loadParams = createMemo(() => ({
    id: props.id ?? "tsparticles",
    options: props.options ?? props.params,
    url: props.url,
  }));

  createEffect(() => {
    const { id, options, url } = loadParams();
    const currentLoadId = ++loadId;

    void (async () => {
      untrack(() => container())?.destroy();

      let newContainer: Container | undefined;

      try {
        await waitForParticlesEngineInitialization();

        if (!isParticlesEngineInitialized()) {
          throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
        }

        newContainer = await tsParticles.load({ id, options, url });
      } catch (error: unknown) {
        if (currentLoadId === loadId) {
          getLogger().error("Particles: error loading particles", error);
        }

        return;
      }

      if (currentLoadId !== loadId) {
        newContainer?.destroy();
        return;
      }

      setContainer(newContainer);

      try {
        await props.particlesLoaded?.(newContainer);
      } catch (error: unknown) {
        getLogger().error("Particles: error in particlesLoaded callback", error);
      }
    })();
  });

  createEffect(() => {
    const currentContainer = container(),
      theme = props.theme;

    if (!currentContainer || !theme) return;

    const currentThemeContainer = currentContainer as unknown as {
        loadTheme?: (name?: string) => Promise<void>;
      },
      loadTheme = currentThemeContainer.loadTheme;

    if (!loadTheme) return;

    void loadTheme(theme).catch((error: unknown) => {
      getLogger().error(`Particles: error loading theme "${theme}"`, error);
    });
  });

  onCleanup(() => {
    ++loadId;
    untrack(() => container())?.destroy();
  });

  return (
    <div class={merged.class} id={merged.id}>
      {/* An unfinished load still owns its canvas until its cleanup completes. */}
      <For each={[merged.id]}>
        {() => (
          <canvas
            class={merged.canvasClass}
            style={{
              ...merged.style,
              width: merged.width,
              height: merged.height,
            }}
          />
        )}
      </For>
    </div>
  );
};

export default Particles;
