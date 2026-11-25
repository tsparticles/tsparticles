import type { ComponentClass, CSSProperties, RefObject } from "preact/compat";
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

export interface IParticlesState {
  init: boolean;
  library?: Container;
}

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

type Particles = ComponentClass<IParticlesProps, IParticlesState>;

declare const Particles: Particles;

declare function initParticlesEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void>;

export default Particles;
export { Particles, initParticlesEngine };
