import { deepExtend, executeOnSingleOrMultiple } from "../../../Utils/Utils.js";
import { AnimatableColor } from "../AnimatableColor.js";
import type { Container } from "../../../Core/Container.js";
import { Effect } from "./Effect/Effect.js";
import { Fill } from "./Fill.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import type { IParticlesOptions } from "../../Interfaces/Particles/IParticlesOptions.js";
import { Move } from "./Move/Move.js";
import { OptionLoader } from "../../../Utils/OptionsUtils.js";
import { Paint } from "./Paint.js";
import { ParticlesBounce } from "./Bounce/ParticlesBounce.js";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups.js";
import { ParticlesNumber } from "./Number/ParticlesNumber.js";
import type { PluginManager } from "../../../Core/Utils/PluginManager.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Shape } from "./Shape/Shape.js";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple.js";
import { ZIndex } from "./ZIndex/ZIndex.js";
import { isArray } from "../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles.md]]
 */
export class ParticlesOptions extends OptionLoader<IParticlesOptions> implements IParticlesOptions {
  [name: string]: unknown;

  readonly bounce;
  readonly effect;
  readonly groups: ParticlesGroups;
  readonly move;
  readonly number;
  paint: SingleOrMultiple<Paint>;
  palette?: string;
  reduceDuplicates;
  readonly shape;
  readonly zIndex;

  readonly #container;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container?: Container) {
    super();
    this.#pluginManager = pluginManager;
    this.#container = container;

    this.bounce = new ParticlesBounce();
    this.effect = new Effect();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.paint = new Paint();
    this.paint.color = new AnimatableColor();
    this.paint.color.value = "#fff";
    this.paint.fill = new Fill();
    this.paint.fill.enable = true;
    this.reduceDuplicates = false;
    this.shape = new Shape();
    this.zIndex = new ZIndex();
  }

  doLoad(data: RecursivePartial<IParticlesOptions>): void {
    if (data.palette) {
      this.palette = data.palette;

      this.#importPalette(this.palette);
    }

    if (data.groups !== undefined) {
      for (const group of Object.keys(data.groups)) {
        if (!(group in data.groups)) {
          continue;
        }

        const item = data.groups[group];

        if (item !== undefined) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item) as IParticlesOptions;
        }
      }
    }

    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }

    this.bounce.load(data.bounce);
    this.effect.load(data.effect);
    this.move.load(data.move);
    this.number.load(data.number);
    const paintToLoad = data.paint;

    if (paintToLoad) {
      if (isArray(paintToLoad)) {
        this.paint = executeOnSingleOrMultiple(paintToLoad, t => {
          const tmp = new Paint();

          tmp.load(t);

          return tmp;
        });
      } else if (isArray(this.paint)) {
        this.paint = new Paint();

        this.paint.load(paintToLoad);
      } else {
        this.paint.load(paintToLoad);
      }
    }

    this.shape.load(data.shape);
    this.zIndex.load(data.zIndex);

    if (this.#container) {
      for (const plugin of this.#pluginManager.plugins) {
        if (plugin.loadParticlesOptions) {
          plugin.loadParticlesOptions(this.#container, this, data);
        }
      }

      const updaters = this.#pluginManager.updaters.get(this.#container);

      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
    }
  }

  #importPalette(palette: string): void {
    const paletteData = this.#pluginManager.getPalette(palette);

    if (!paletteData) {
      return;
    }

    const paletteColors = paletteData.colors,
      defaultPaintStrokeWidth = 0,
      defaultPaintVariantsLength = 1,
      firstPaintVariantIndex = 0,
      defaultPalettePaintVariant: IPaint = {},
      colorVariants = isArray(paletteColors) ? paletteColors : [paletteColors],
      palettePaintVariants = colorVariants.flatMap<IPaint>(variant => {
        const paletteFill = variant.fill,
          paletteStroke = variant.stroke,
          fillPart: IPaint["fill"] = paletteFill
            ? {
                color: {
                  value: paletteFill.value,
                },
                enable: paletteFill.enable,
                opacity: paletteFill.opacity,
              }
            : undefined;

        if (!paletteStroke) {
          return [
            {
              fill: fillPart,
            },
          ];
        }

        return [
          {
            fill: fillPart,
            stroke: {
              color: {
                value: paletteStroke.value,
              },
              opacity: paletteStroke.opacity,
              width: paletteStroke.width || defaultPaintStrokeWidth,
            },
          },
        ];
      }),
      palettePaint: SingleOrMultiple<IPaint> =
        palettePaintVariants.length > defaultPaintVariantsLength
          ? palettePaintVariants
          : (palettePaintVariants[firstPaintVariantIndex] ?? defaultPalettePaintVariant);

    this.load({
      paint: palettePaint,
      blend: {
        enable: true,
        mode: paletteData.blendMode,
      },
    });
  }
}
