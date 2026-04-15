import { NoSerialize, component$, noSerialize, useVisibleTask$ } from "@builder.io/qwik";
import { Container, tsParticles } from "@tsparticles/engine";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = component$<IParticlesProps>(props => {
  const librarySig: { value: NoSerialize<Container | undefined> } = { value: undefined };

  const id = props.id ?? "tsparticles";

  const { class: className, canvasClassName, height, width, loaded } = props;

  useVisibleTask$(function Initializer({ cleanup }) {
    void (async () => {
      await waitForParticlesEngineInitialization();

      if (!isParticlesEngineInitialized()) {
        throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
      }

      const container = await tsParticles.load({
        url: props.url,
        id,
        options: props.options ?? props.params,
      });

      if (props.container) {
        props.container.value = noSerialize(container);
      }

      librarySig.value = noSerialize(container);

      if (loaded) {
        await loaded(container);
      }
    })();

    cleanup(() => {
      if (librarySig.value) {
        librarySig.value.destroy();
        librarySig.value = undefined;
      }
    });
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
