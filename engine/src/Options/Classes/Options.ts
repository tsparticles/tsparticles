import { deepExtend, executeOnSingleOrMultiple } from "../../Utils/Utils.js";
import { isBoolean, isNull } from "../../Utils/TypeUtils.js";
import { Background } from "./Background/Background.js";
import type { Container } from "../../Core/Container.js";
import { FullScreen } from "./FullScreen/FullScreen.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IOptions } from "../Interfaces/IOptions.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { PluginManager } from "../../Core/Utils/PluginManager.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { ResizeEvent } from "./ResizeEvent.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
import { loadParticlesOptions } from "../../Utils/OptionsUtils.js";
import { setRangeValue } from "../../Utils/MathUtils.js";

/** Default themes configuration */
export interface DefaultThemes {
  /** The default dark theme */
  dark?: string;
  /** The default light theme */
  light?: string;
}

/**
 * [[include:Options.md]]
 */
export class Options implements IOptions, IOptionLoader<IOptions> {
  [name: string]: unknown;

  /** The autoPlay flag */
  autoPlay;
  /** The background options */
  readonly background;
  /** The clear flag */
  clear: boolean;
  /** The default themes */
  defaultThemes: DefaultThemes;
  /** The delay value */
  delay: RangeValue;
  /** The detect retina flag */
  detectRetina;
  /** The duration value */
  duration: RangeValue;
  /** The FPS limit */
  fpsLimit;
  /** The full screen options */
  readonly fullScreen;
  /** The HDR flag */
  hdr;
  /** The key value */
  key?: string;
  /** The name value */
  name?: string;
  /** The palette value */
  palette?: string;
  /** The particles options */
  readonly particles;
  /** The pause on blur flag */
  pauseOnBlur;
  /** The pause on outside viewport flag */
  pauseOnOutsideViewport;
  /** The preset value */
  preset?: SingleOrMultiple<string>;
  /** The resize options */
  readonly resize;
  /** The smooth flag */
  smooth: boolean;
  /** The style options */
  style: RecursivePartial<CSSStyleDeclaration>;
  /** The z-layers value */
  zLayers;

  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this._pluginManager = pluginManager;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.clear = true;
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.hdr = true;
    this.particles = loadParticlesOptions(this._pluginManager, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.resize = new ResizeEvent();
    this.smooth = false;
    this.style = {};
    this.zLayers = 100;
  }

  /**
   * This method loads the source object in the current instance
   * @param data - the source data to load into the instance
   */
  load(data?: ISourceOptions): void {
    if (isNull(data)) {
      return;
    }

    if (data.preset !== undefined) {
      this.preset = data.preset;

      executeOnSingleOrMultiple(this.preset, preset => {
        this._importPreset(preset);
      });
    }

    if (data.palette !== undefined) {
      this.palette = data.palette;

      this._importPalette(this.palette);
    }

    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }

    if (data.clear !== undefined) {
      this.clear = data.clear;
    }

    if (data.key !== undefined) {
      this.key = data.key;
    }

    if (data.name !== undefined) {
      this.name = data.name;
    }

    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }

    const detectRetina = data.detectRetina;

    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }

    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }

    const fpsLimit = data.fpsLimit;

    if (fpsLimit !== undefined) {
      this.fpsLimit = fpsLimit;
    }

    if (data.hdr !== undefined) {
      this.hdr = data.hdr;
    }

    if (data.pauseOnBlur !== undefined) {
      this.pauseOnBlur = data.pauseOnBlur;
    }

    if (data.pauseOnOutsideViewport !== undefined) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }

    if (data.zLayers !== undefined) {
      this.zLayers = data.zLayers;
    }

    this.background.load(data.background);

    const fullScreen = data.fullScreen;

    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }

    this.particles.load(data.particles);

    this.resize.load(data.resize);

    this.style = deepExtend(this.style, data.style) as RecursivePartial<CSSStyleDeclaration>;

    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }

    this._pluginManager.plugins.forEach(plugin => {
      plugin.loadOptions(this._container, this, data);
    });
  }

  private readonly _importPalette: (palette: string) => void = palette => {
    const paletteData = this._pluginManager.getPalette(palette);

    if (!paletteData) {
      return;
    }

    this.load({
      background: {
        color: paletteData.background,
      },
      blend: {
        enable: true,
        mode: paletteData.blendMode,
      },
      particles: {
        palette,
      },
    });
  };

  private readonly _importPreset: (preset: string) => void = preset => {
    this.load(this._pluginManager.getPreset(preset));
  };
}
