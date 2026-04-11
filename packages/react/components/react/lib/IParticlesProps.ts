import type { Container, ISourceOptions } from "@tsparticles/engine";
import type { CSSProperties } from "react";

export interface IParticlesProps {
  id?: string;
  options?: ISourceOptions;
  url?: string;
  style?: CSSProperties;
  className?: string;
  particlesLoaded?: (container?: Container) => Promise<void>;
}
