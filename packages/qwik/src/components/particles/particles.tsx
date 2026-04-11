import {
  $,
  NoSerialize,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Container, tsParticles } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";

/**
 * @param (props:IParticlesProps) Particles component properties
 */
const Particles = component$<IParticlesProps>((props) => {
  const initSig = useSignal(false);

  const librarySig = useSignal<NoSerialize<Container | undefined>>(undefined);

  const id = props.id ?? "tsparticles";

  const {
    init: InitFC,
    class: className,
    canvasClassName,
    height,
    width,
    loaded,
  } = props;

  useVisibleTask$(function Initializer({ track, cleanup }) {
    track(() => initSig.value);

    const loadParticles = $(async () => {
      if (!initSig.value) return;

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
    });

    const initParticles = async () => {
      if (InitFC) {
        await InitFC(tsParticles);
      }

      initSig.value = true;
      await loadParticles();
    };

    initParticles();

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
