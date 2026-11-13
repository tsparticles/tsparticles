import { component$, noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { NoSerialize } from "@builder.io/qwik";
import { type Container, getLogger, tsParticles } from "@tsparticles/engine";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

async function loadTheme(container: Container, theme: string, isCurrent: () => boolean): Promise<void> {
  try {
    await (container as Container & { loadTheme?: (name: string) => Promise<void> }).loadTheme?.(theme);
  } catch (error: unknown) {
    if (isCurrent()) {
      getLogger().error("Particles: error loading theme", error);
    }
  }
}

const Particles = component$<IParticlesProps>(props => {
  const librarySig = useSignal<NoSerialize<Container | undefined>>();

  const id = props.id ?? "tsparticles";
  const { class: className, canvasClassName, height, width, loaded } = props;

  useVisibleTask$(function Initializer({ track, cleanup }) {
    const trackedId = track(() => props.id) ?? "tsparticles";
    const options = track(() => props.options);
    const url = track(() => props.url);

    let cancelled = false;
    let owned: NoSerialize<Container> | undefined;

    cleanup(() => {
      cancelled = true;

      if (!owned) {
        return;
      }

      if (librarySig.value === owned) {
        librarySig.value = undefined;
      }

      if (props.container?.value === owned) {
        props.container.value = undefined;
      }

      owned.destroy();
    });

    void (async () => {
      let container: Container | undefined;

      try {
        await waitForParticlesEngineInitialization();

        if (cancelled) {
          return;
        }

        if (!isParticlesEngineInitialized()) {
          throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
        }

        container = await tsParticles.load({ url, id: trackedId, options: options ?? props.params });
      } catch (error: unknown) {
        if (!cancelled) {
          getLogger().error("Particles: error loading particles", error);
        }

        return;
      }

      if (cancelled) {
        container?.destroy();

        return;
      }

      owned = container ? noSerialize(container) : undefined;
      librarySig.value = owned;

      if (props.container) {
        props.container.value = owned;
      }

      if (container && props.theme) {
        void loadTheme(container, props.theme, () => !cancelled);
      }

      try {
        await loaded?.(container);
      } catch (error: unknown) {
        getLogger().error("Particles: error in loaded callback", error);
      }
    })();
  });

  useVisibleTask$(function ThemeWatcher({ track }) {
    const theme = track(() => props.theme);

    const container = librarySig.value;
    if (!container || !theme) return;

    void loadTheme(container, theme, () => librarySig.value === container);
  });

  return (
    <div class={className} id={id}>
      <canvas
        key={id}
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
