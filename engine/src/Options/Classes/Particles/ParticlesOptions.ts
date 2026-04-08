import { deepExtend, executeOnSingleOrMultiple } from "../../../Utils/Utils.js";
import { isArray, isNull } from "../../../Utils/TypeUtils.js";
import type { Container } from "../../../Core/Container.js";
import { Effect } from "./Effect/Effect.js";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import type { IPaint } from "../../Interfaces/Particles/IPaint.js";
import type { IParticlesOptions } from "../../Interfaces/Particles/IParticlesOptions.js";
import { Move } from "./Move/Move.js";
import { Opacity } from "./Opacity/Opacity.js";
import { Paint } from "./Paint.js";
import { ParticlesBounce } from "./Bounce/ParticlesBounce.js";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups.js";
import { ParticlesNumber } from "./Number/ParticlesNumber.js";
import type { PluginManager } from "../../../Core/Utils/PluginManager.js";
import type { RecursivePartial } from "../../../Types/RecursivePartial.js";
import { Shape } from "./Shape/Shape.js";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple.js";
import { Size } from "./Size/Size.js";
import { ZIndex } from "./ZIndex/ZIndex.js";

/**
 * [[include:Options/Particles.md]]
 */
export class ParticlesOptions implements IParticlesOptions, IOptionLoader<IParticlesOptions> {
  [name: string]: unknown;

  readonly bounce;
  readonly effect;
  readonly groups: ParticlesGroups;
  readonly move;
  readonly number;
  readonly opacity;
  paint: SingleOrMultiple<Paint>;
  palette?: string;
  reduceDuplicates;
  readonly shape;
  readonly size;
  readonly zIndex;

  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container?: Container) {
    this._pluginManager = pluginManager;
    this._container = container;

    this.bounce = new ParticlesBounce();
    this.effect = new Effect();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.paint = new Paint();
    this.reduceDuplicates = false;
    this.shape = new Shape();
    this.size = new Size();
    this.zIndex = new ZIndex();
  }

  load(data?: RecursivePartial<IParticlesOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.palette) {
      this.palette = data.palette;

      this._importPalette(this.palette);
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
    this.opacity.load(data.opacity);
    const paintToLoad = data.paint;

    if (paintToLoad) {
      this.paint = executeOnSingleOrMultiple(paintToLoad, t => {
        const tmp = new Paint();

        tmp.load(t);

        return tmp;
      });
    }

    this.shape.load(data.shape);
    this.size.load(data.size);
    this.zIndex.load(data.zIndex);

    if (this._container) {
      for (const plugin of this._pluginManager.plugins) {
        if (plugin.loadParticlesOptions) {
          plugin.loadParticlesOptions(this._container, this, data);
        }
      }

      const updaters = this._pluginManager.updaters.get(this._container);

      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
    }
  }

  private readonly _importPalette = (palette: string): void => {
    const paletteData = this._pluginManager.getPalette(palette);

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
  };
}
