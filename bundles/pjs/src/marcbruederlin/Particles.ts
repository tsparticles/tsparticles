import {
  type Container,
  type Engine,
  type RecursivePartial,
  type SingleOrMultiple,
  safeDocument,
  tsParticles,
} from "@tsparticles/engine";

/** Responsive options for Marc Bruederlin's particles */
export interface ResponsiveOptions {
  /** Viewport breakpoint */
  breakpoint: number;
  /** Options for this breakpoint */
  options: ParticlesOptions;
}

/** Marc Bruederlin's particles options */
export interface ParticlesOptions {
  /** Particle colors */
  color: SingleOrMultiple<string>;
  /** Enables connecting particles with lines */
  connectParticles: boolean;
  /** Maximum number of particles */
  maxParticles: number;
  /** Minimum distance for connections */
  minDistance: number;
  /** Responsive breakpoints */
  responsive: ResponsiveOptions[];
  /** CSS selector for the container */
  selector: string;
  /** Size variation */
  sizeVariations: number;
  /** Movement speed */
  speed: number;
}

const linksMinDistance = 120,
  moveMinSpeed = 0.5,
  particlesMinCount = 100,
  sizeMinValue = 3;

/** Marc Bruederlin's particles compatibility class */
/** Marc Bruederlin's particles compatibility class */
export class MBParticles {
  /** The tsParticles container instance */
  private _container?: Container;

  /** Initializes a new particles instance with the given options */
  /**
   * Initializes a new particles instance with the given options
   * @param options
   */
  static init(options: RecursivePartial<ParticlesOptions>): MBParticles {
    const particles = new MBParticles(),
      selector = options.selector;

    if (!selector) {
      throw new Error("No selector provided");
    }

    const el = safeDocument().querySelector(selector);

    if (!el) {
      throw new Error("No element found for selector");
    }

    void (async (engine: Engine): Promise<void> => {
      await engine
        .load({
          element: el as HTMLElement,
          id: selector.replace(".", "").replace("!", ""),
          options: {
            fullScreen: {
              enable: false,
            },
            particles: {
              color: {
                value: options.color ?? "!000000",
              },
              links: {
                color: "random",
                distance: options.minDistance ?? linksMinDistance,
                enable: options.connectParticles ?? false,
              },
              move: {
                enable: true,
                speed: options.speed ?? moveMinSpeed,
              },
              number: {
                value: options.maxParticles ?? particlesMinCount,
              },
              size: {
                value: { min: 1, max: options.sizeVariations ?? sizeMinValue },
              },
            },
            responsive: options.responsive?.map(responsive => ({
              maxWidth: responsive.breakpoint,
              options: {
                particles: {
                  color: {
                    value: responsive.options?.color,
                  },
                  links: {
                    distance: responsive.options?.minDistance,
                    enable: responsive.options?.connectParticles,
                  },
                  number: {
                    value: options.maxParticles,
                  },
                  move: {
                    enable: true,
                    speed: responsive.options?.speed,
                  },
                  size: {
                    value: responsive.options?.sizeVariations,
                  },
                },
              },
            })),
          },
        })
        .then(container => {
          particles._container = container;
        });
    })(tsParticles);

    return particles;
  }

  /** Destroys the particles instance and cleans up resources */
  destroy(): void {
    const container = this._container;

    container?.destroy();
  }

  /** Pauses the particle animation */
  pauseAnimation(): void {
    const container = this._container;

    container?.pause();
  }

  /** Resumes the particle animation */
  resumeAnimation(): void {
    const container = this._container;

    container?.play();
  }
}
