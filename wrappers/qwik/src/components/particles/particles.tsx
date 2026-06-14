import { component$, noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { NoSerialize } from "@builder.io/qwik";
import { type Container, tsParticles } from "@tsparticles/engine";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

const Particles = component$<IParticlesProps>(props => {
  const librarySig = useSignal<NoSerialize<Container | undefined>>();

  const id = props.id ?? "tsparticles";
  const { class: className, canvasClassName, height, width, loaded } = props;

  useVisibleTask$(function Initializer({ track, cleanup }) {
    const trackedId = track(() => props.id) ?? "tsparticles";
    const options = track(() => props.options);
    const url = track(() => props.url);

    cleanup(() => {
      const c = librarySig.value;
      if (c) {
        c.destroy();
        librarySig.value = undefined;
      }
    });

    void (async () => {
      await waitForParticlesEngineInitialization();

      if (!isParticlesEngineInitialized()) {
        throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
      }

      const old = librarySig.value;
      if (old) {
        old.destroy();
        librarySig.value = undefined;
      }

      const container = await tsParticles.load({
        url,
        id: trackedId,
        options: options ?? props.params,
      });

      if (props.container) {
        props.container.value = noSerialize(container);
      }

      librarySig.value = noSerialize(container);

      if (container && props.theme) {
        (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(props.theme);
      }

      if (loaded) {
        await loaded(container);
      }
    })();
  });

  useVisibleTask$(function ThemeWatcher({ track }) {
    const theme = track(() => props.theme);

    const container = librarySig.value;
    if (!container || !theme) return;

    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
  });

  return (
    <div class={className} id={id}>
      <canvas
        class={canvasClassName}
        height={height}
        width={width}
        style={{
          ...props.style,
        }}
      />
    </div>
  );
});

export default Particles;
