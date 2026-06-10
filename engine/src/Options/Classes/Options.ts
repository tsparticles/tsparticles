import { OptionLoader, loadParticlesOptions, loadProperty, loadRangeProperty } from "../../Utils/OptionsUtils.js";
import { deepExtend, executeOnSingleOrMultiple } from "../../Utils/Utils.js";
import { Background } from "./Background/Background.js";
import type { Container } from "../../Core/Container.js";
import { FullScreen } from "./FullScreen/FullScreen.js";
import type { IOptions } from "../Interfaces/IOptions.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { PluginManager } from "../../Core/Utils/PluginManager.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { ResizeEvent } from "./ResizeEvent.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
import { isBoolean } from "../../Utils/TypeUtils.js";

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
export class Options extends OptionLoader<IOptions> implements IOptions {
  [name: string]: unknown;

  /** The autoPlay flag */
  autoPlay = true;
  /** The background options */
  readonly background: Background;
  /** The clear flag */
  clear = true;
  /** The default themes */
  defaultThemes: DefaultThemes = {};
  /** The delay value */
  delay: RangeValue = 0;
  /** The detect retina flag */
  detectRetina = true;
  /** The duration value */
  duration: RangeValue = 0;
  /** The FPS limit */
  fpsLimit = 120;
  /** The full screen options */
  readonly fullScreen: FullScreen;
  /** The HDR flag */
  hdr = true;
  /** The key value */
  key?: string;
  /** The name value */
  name?: string;
  /** The palette value */
  palette?: string;
  /** The particles options */
  readonly particles;
  /** The pause on blur flag */
  pauseOnBlur = true;
  /** The pause on outside viewport flag */
  pauseOnOutsideViewport = true;
  /** The preset value */
  preset?: SingleOrMultiple<string>;
  /** The resize options */
  readonly resize: ResizeEvent;
  /** The smooth flag */
  smooth = false;
  /** The style options */
  style: RecursivePartial<CSSStyleDeclaration> = {};
  /** The z-layers value */
  zLayers = 100;

  readonly #container;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    super();
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.background = new Background();
    this.fullScreen = new FullScreen();
    this.particles = loadParticlesOptions(this.#pluginManager, this.#container);
    this.resize = new ResizeEvent();
  }

  /**
   * This method loads the source object in the current instance
   * @param data - the source data to load into the instance
   */
  protected doLoad(data: ISourceOptions): void {
    if (data.preset !== undefined) {
      this.preset = data.preset;

      executeOnSingleOrMultiple(this.preset, preset => {
        this.#importPreset(preset);
      });
    }

    if (data.palette !== undefined) {
      this.palette = data.palette;

      this.#importPalette(this.palette);
    }

    loadProperty(this, "autoPlay", data.autoPlay);
    loadProperty(this, "clear", data.clear);
    loadProperty(this, "key", data.key);
    loadProperty(this, "name", data.name);
    loadRangeProperty(this, "delay", data.delay);
    loadProperty(this, "detectRetina", data.detectRetina);
    loadRangeProperty(this, "duration", data.duration);
    loadProperty(this, "fpsLimit", data.fpsLimit);
    loadProperty(this, "hdr", data.hdr);
    loadProperty(this, "pauseOnBlur", data.pauseOnBlur);
    loadProperty(this, "pauseOnOutsideViewport", data.pauseOnOutsideViewport);
    loadProperty(this, "zLayers", data.zLayers);

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

    loadProperty(this, "smooth", data.smooth);

    this.#pluginManager.plugins.forEach(plugin => {
      plugin.loadOptions(this.#container, this, data);
    });
  }

  #importPalette(palette: string): void {
    const paletteData = this.#pluginManager.getPalette(palette);

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
  }

  #importPreset(preset: string): void {
    this.load(this.#pluginManager.getPreset(preset));
  }
}
