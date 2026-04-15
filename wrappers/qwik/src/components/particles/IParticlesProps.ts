import { CSSProperties, ClassList, NoSerialize, QRL, Signal } from "@builder.io/qwik";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export interface IParticlesProps {
  id?: string;
  width?: number | string;
  height?: number | string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: CSSProperties;
  class?: ClassList | Signal<ClassList>;
  canvasClassName?: ClassList | Signal<ClassList>;
  container?: Signal<NoSerialize<Container | undefined>>;
  loaded?: QRL<(container?: Container) => Promise<void>>;
}
