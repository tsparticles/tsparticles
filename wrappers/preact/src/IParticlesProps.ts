import type { CSSProperties, RefObject } from "react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export interface IParticlesProps {
  engine: Engine;
  id?: string;
  width?: string;
  height?: string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: CSSProperties;
  className?: string;
  canvasClassName?: string;
  container?: RefObject<Container | undefined>;
  particlesLoaded?: (container?: Container) => Promise<void>;
  theme?: string;
}
