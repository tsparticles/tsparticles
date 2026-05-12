import type { Container, IHsl, IRgb, IValueColor, MoveDirection, OutMode } from "@tsparticles/engine";
import type { InteractivityDetect } from "@tsparticles/plugin-interactivity";

/**
 * @deprecated this interface is obsolete, please use the new tsParticles options format
 */
export interface IParticlesJSOptions {
  /** Interactivity configuration */
  interactivity: {
    /** Event detection mode */
    detect_on: InteractivityDetect | keyof typeof InteractivityDetect;
    /** Interaction events */
    events: {
      /** Click event configuration */
      onclick: {
        enable: boolean;
        mode: string;
      };
      /** Hover event configuration */
      onhover: {
        enable: boolean;
        mode: string;
      };
      /** Resize event enabled */
      resize: boolean;
    };
    /** Interaction modes */
    modes: {
      /** Bubble mode configuration */
      bubble: {
        distance: number;
        duration: number;
        opacity: number;
        size: number;
        speed: number;
      };
      /** Grab mode configuration */
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      /** Push mode configuration */
      push: {
        particles_nb: number;
      };
      /** Remove mode configuration */
      remove: {
        particles_nb: number;
      };
      /** Repulse mode configuration */
      repulse: {
        distance: number;
        duration: number;
      };
    };
  };
  /** Particle configuration */
  particles: {
    /** Particle color */
    color: {
      value: string | IRgb | IHsl | IValueColor;
    };
    /** Line linked (links) configuration */
    line_linked: {
      color: string;
      distance: number;
      enable: boolean;
      opacity: number;
      width: number;
    };
    /** Movement configuration */
    move: {
      /** Attract configuration */
      attract: {
        enable: boolean;
        rotateX: number;
        rotateY: number;
      };
      bounce: boolean;
      direction: MoveDirection | keyof typeof MoveDirection;
      enable: boolean;
      out_mode: OutMode | keyof typeof OutMode;
      random: boolean;
      speed: number;
      straight: boolean;
    };
    /** Number of particles */
    number: {
      /** Density configuration */
      density: {
        enable: boolean;
        value_area: number;
      };
      value: number;
    };
    /** Opacity configuration */
    opacity: {
      /** Opacity animation */
      anim: {
        enable: boolean;
        opacity_min: number;
        speed: number;
        sync: boolean;
      };
      random: boolean;
      value: number;
    };
    /** Shape configuration */
    shape: {
      /** Image shape options */
      image: {
        height: number;
        replace_color?: boolean;
        src: string;
        width: number;
      };
      /** Polygon shape options */
      polygon: {
        nb_sides: number;
      };
      /** Stroke configuration */
      stroke: {
        color: string | IRgb | IHsl | IValueColor;
        width: number;
      };
      type: string;
    };
    /** Size configuration */
    size: {
      /** Size animation */
      anim: {
        enable: boolean;
        size_min: number;
        speed: number;
        sync: boolean;
      };
      random: boolean;
      value: number;
    };
  };
  /** Enables retina detection */
  retina_detect: boolean;
}

/**
 * [[include:pjsMigration.md]]
 */
export interface IParticlesJS {
  /**
   * Loads the provided options to create a {@link Container} object.
   * @deprecated this method is obsolete, please use the new tsParticles.load
   * @param tagId - the particles container element id
   * @param options - the options object to initialize the {@link Container}
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (tagId: string, options: IParticlesJSOptions): Promise<Container | undefined>;

  /**
   * Loads the provided json with a GET request.
   * The content will be used to create a {@link Container} object.
   * @deprecated this method is obsolete, please use the new tsParticles.load
   * @param tagId - the particles container element id
   * @param pathConfigJson - the json path to use in the GET request
   * @param callback - called after the {@link Container} is loaded and it will be passed as a parameter
   */
  load(tagId: string, pathConfigJson: string, callback: (container?: Container) => void): void;

  /**
   * Adds an additional click handler to all the loaded {@link Container} objects.
   * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
   * @param callback - the function called after the click event is fired
   */
  setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}
