import { CSSProperties, ClassList, NoSerialize, QRL, Signal } from "@builder.io/qwik";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export interface IParticlesProps {
  engine?: Engine;
  id?: string;
  width?: number | string;
  height?: number | string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  theme?: string;
  style?: CSSProperties;
  class?: ClassList | Signal<ClassList>;
  canvasClassName?: ClassList | Signal<ClassList>;
  container?: Signal<NoSerialize<Container | undefined>>;
  loaded?: QRL<(container?: Container) => Promise<void>>;
}
