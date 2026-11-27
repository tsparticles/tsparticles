import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

import { JSX } from "solid-js";

export interface IParticlesProps {
  engine: Engine;
  id?: string;
  width?: string;
  height?: string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: JSX.CSSProperties;
  class?: string;
  canvasClass?: string;
  container?: { current: Container };
  theme?: string;
  particlesLoaded?: (container?: Container) => Promise<void>;
}
