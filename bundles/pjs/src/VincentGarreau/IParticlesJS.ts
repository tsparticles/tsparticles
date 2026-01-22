import type { Container, IHsl, IRgb, IValueColor, MoveDirection, OutMode } from "@tsparticles/engine";
import type { InteractivityDetect } from "@tsparticles/plugin-interactivity";

export interface IParticlesJSOptions {
  interactivity: {
    detect_on: InteractivityDetect | keyof typeof InteractivityDetect;
    events: {
      onclick: {
        enable: boolean;
        mode: string;
      };
      onhover: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      bubble: {
        distance: number;
        duration: number;
        opacity: number;
        size: number;
        speed: number;
      };
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      push: {
        particles_nb: number;
      };
      remove: {
        particles_nb: number;
      };
      repulse: {
        distance: number;
        duration: number;
      };
    };
  };
  particles: {
    color: {
      value: string | IRgb | IHsl | IValueColor;
    };
    line_linked: {
      color: string;
      distance: number;
      enable: boolean;
      opacity: number;
      width: number;
    };
    move: {
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
    number: {
      density: {
        enable: boolean;
        value_area: number;
      };
      value: number;
    };
    opacity: {
      anim: {
        enable: boolean;
        opacity_min: number;
        speed: number;
        sync: boolean;
      };
      random: boolean;
      value: number;
    };
    shape: {
      image: {
        height: number;
        replace_color?: boolean;
        src: string;
        width: number;
      };
      polygon: {
        nb_sides: number;
      };
      stroke: {
        color: string | IRgb | IHsl | IValueColor;
        width: number;
      };
      type: string;
    };
    size: {
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
