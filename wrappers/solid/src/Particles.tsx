import { tsParticles, type Container } from "@tsparticles/engine";
import { createEffect, createMemo, JSX, mergeProps, onCleanup } from "solid-js";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

const Particles = (props: IParticlesProps): JSX.Element => {
  const merged = mergeProps({ id: "tsparticles" }, props);

  let container: Container | undefined;
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
      container?.destroy();

      await waitForParticlesEngineInitialization();

      if (!isParticlesEngineInitialized()) {
        throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
      }

      const newContainer = await tsParticles.load({ id, options, url });

      if (currentLoadId !== loadId) {
        newContainer?.destroy();
        return;
      }

      container = newContainer;

      props.particlesLoaded?.(container);
    })();
  });

  createEffect(() => {
    const theme = props.theme;

    if (!container || !theme) return;
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
  });

  onCleanup(() => {
    container?.destroy();
  });

  return (
    <div class={merged.class} id={merged.id}>
      <canvas
        class={merged.canvasClass}
        style={{
          ...merged.style,
          width: merged.width,
          height: merged.height,
        }}
      />
    </div>
  );
};

export default Particles;
