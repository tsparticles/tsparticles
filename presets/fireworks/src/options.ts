import {
  type CustomEventArgs,
  DestroyType,
  EventType,
  type IParticlesOptions,
  type IRangeValue,
  type IRgba,
  type ISourceOptions,
  MoveDirection,
  OutMode,
  type Particle,
  type RangeValue,
  type RecursivePartial,
  StartValueType,
  defaultAlpha,
  none,
  rgbToHsl,
  setRangeValue,
} from "@tsparticles/engine";

/**
 * @returns the options for the fireworks preset
 */
export function initOptions(): ISourceOptions {
  const explodeSoundCheck = (args: CustomEventArgs): boolean => {
      const data = args.data as { particle: Particle };

      return data.particle.options.move.gravity.inverse;
    },
    fixRange = (value: IRangeValue, min: number, max: number): RangeValue => {
      const minValue = 0,
        diffSMax = value.max > max ? value.max - max : minValue;

      let res = setRangeValue(value);

      if (diffSMax) {
        res = setRangeValue(value.min - diffSMax, max);
      }

      const diffSMin = value.min < min ? value.min : minValue;

      if (diffSMin) {
        res = setRangeValue(minValue, value.max + diffSMin);
      }

      return res;
    },
    hexToRgba = (hex: string): IRgba | undefined => {
      let hexValue = hex;

      const shortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;

      if (shortRegex.test(hexValue)) {
        hexValue = hexValue.replace(
          shortRegex,
          (_m, r: string, g: string, b: string, a?: string) => r + r + g + g + b + b + (a ? a + a : ""),
        );
      }

      const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
        result = regex.exec(hexValue);

      if (!result) {
        return undefined;
      }

      result.shift();

      const indexes = {
          a: 3,
          b: 2,
          g: 1,
          r: 0,
        },
        values = {
          a: result[indexes.a],
          b: result[indexes.b],
          g: result[indexes.g],
          r: result[indexes.r],
        },
        hexRadix = 16;

      return {
        r: values.r ? Number.parseInt(values.r, hexRadix) : none,
        g: values.g ? Number.parseInt(values.g, hexRadix) : none,
        b: values.b ? Number.parseInt(values.b, hexRadix) : none,
        a: values.a ? Number.parseInt(values.a, hexRadix) : defaultAlpha,
      };
    },
    fireworksOptions: RecursivePartial<IParticlesOptions>[] = [
      "#FF0000",
      "#FF2A00",
      "#FF5500",
      "#FF8000",
      "#FFAA00",
      "#FFD400",
      "#FFFF00",
      "#D4FF00",
      "#AAFF00",
      "#80FF00",
      "#55FF00",
      "#2AFF00",
      "#00FF00",
      "#00FF2A",
      "#00FF55",
      "#00FF80",
      "#00FFAA",
      "#00FFD4",
      "#00FFFF",
      "#00D4FF",
      "#00AAFF",
      "#0080FF",
      "#0055FF",
      "#002AFF",
      "#0000FF",
      "#2A00FF",
      "#5500FF",
      "#8000FF",
      "#AA00FF",
      "#D400FF",
      "#FF00FF",
      "#FF00D4",
      "#FF00AA",
      "#FF0080",
      "#FF0055",
      "#FF002A",
    ]
      .map(color => {
        const rgb = hexToRgba(color);

        if (!rgb) {
          return undefined;
        }

        const hsl = rgbToHsl(rgb),
          sOffset = 30,
          lOffset = 30,
          sBounds: IRangeValue = {
            min: 0,
            max: 100,
          },
          lBounds: IRangeValue = {
            min: 0,
            max: 100,
          },
          sRange = fixRange({ min: hsl.s - sOffset, max: hsl.s + sOffset }, sBounds.min, sBounds.max),
          lRange = fixRange({ min: hsl.l - lOffset, max: hsl.l + lOffset }, lBounds.min, lBounds.max);

        return {
          color: {
            value: {
              h: hsl.h,
              s: sRange,
              l: lRange,
            },
          },
          stroke: {
            width: 0,
          },
          number: {
            value: 0,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 0.7,
              sync: false,
              startValue: StartValueType.max,
              destroy: DestroyType.min,
            },
          },
          shape: {
            type: "circle",
          },
          effect: {
            type: "trail",
            options: {
              trail: {
                length: {
                  min: 5,
                  max: 10,
                },
              },
            },
          },
          size: {
            value: { min: 1, max: 2 },
            animation: {
              enable: true,
              speed: 5,
              count: 1,
              sync: false,
              startValue: StartValueType.min,
              destroy: DestroyType.none,
            },
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2,
              },
            },
          },
          move: {
            decay: { min: 0.075, max: 0.1 },
            enable: true,
            gravity: {
              enable: true,
              inverse: false,
              acceleration: 5,
            },
            speed: { min: 5, max: 15 },
            direction: "none",
            outModes: OutMode.destroy,
          },
        } as RecursivePartial<IParticlesOptions>;
      })
      .filter(t => t !== undefined);

  return {
    detectRetina: true,
    background: {
      color: "#000",
    },
    fpsLimit: 120,
    emitters: {
      direction: MoveDirection.top,
      rate: {
        delay: 0.3,
        quantity: 1,
      },
      size: {
        width: 100,
        height: 0,
      },
      position: {
        y: 100,
        x: 50,
      },
    },
    particles: {
      number: {
        value: 0,
      },
      destroy: {
        mode: "split",
        bounds: {
          top: { min: 15, max: 35 },
        },
        split: {
          sizeOffset: false,
          count: 1,
          factor: {
            value: 0.333333,
          },
          rate: {
            value: { min: 75, max: 150 },
          },
          particles: fireworksOptions,
        },
      },
      life: {
        count: 1,
      },
      shape: {
        type: "circle",
      },
      effect: {
        type: "trail",
        options: {
          trail: {
            length: {
              min: 5,
              max: 15,
            },
            minWidth: 1,
            maxWidth: 1,
          },
        },
      },
      size: {
        value: 1,
      },
      stroke: {
        color: {
          value: "#ffffff",
        },
        width: 1,
      },
      move: {
        enable: true,
        gravity: {
          acceleration: 15,
          enable: true,
          inverse: true,
          maxSpeed: 100,
        },
        speed: {
          min: 10,
          max: 20,
        },
        outModes: {
          default: OutMode.destroy,
          top: OutMode.none,
        },
      },
    },
    sounds: {
      enable: true,
      events: [
        {
          event: EventType.particleRemoved,
          filter: explodeSoundCheck,
          audio: [
            "https://particles.js.org/audio/explosion0.mp3",
            "https://particles.js.org/audio/explosion1.mp3",
            "https://particles.js.org/audio/explosion2.mp3",
          ],
        },
      ],
      volume: 50,
    },
  };
}
