import {
  type Container,
  type Engine,
  type IContainerPlugin,
  type IPlugin,
  type RecursivePartial,
} from "@tsparticles/engine";
import type { ISoundsOptions, SoundsOptions } from "./types.js";
import { mouseDownEvent, touchStartEvent } from "./constants.js";
import { Sounds } from "./Options/Classes/Sounds.js";
import { unmuteWindow } from "./utils.js";

const generalFirstClickHandler = (): void => {
  removeEventListener(mouseDownEvent, generalFirstClickHandler);
  removeEventListener(touchStartEvent, generalFirstClickHandler);

  unmuteWindow();
};

/**
 */
export class SoundsPlugin implements IPlugin {
  readonly id = "sounds";

  private readonly _engine;

  constructor(engine: Engine) {
    this._engine = engine;

    const listenerOptions = {
      capture: true,
      once: true,
    };

    addEventListener(mouseDownEvent, generalFirstClickHandler, listenerOptions);
    addEventListener(touchStartEvent, generalFirstClickHandler, listenerOptions);
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { SoundsPluginInstance } = await import("./SoundsPluginInstance.js");

    return new SoundsPluginInstance(container, this._engine);
  }

  loadOptions(_container: Container, options: SoundsOptions, source?: RecursivePartial<ISoundsOptions>): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    let soundsOptions = options.sounds;

    if (soundsOptions?.load === undefined) {
      options.sounds = soundsOptions = new Sounds();
    }

    soundsOptions.load(source?.sounds);
  }

  needsPlugin(options?: RecursivePartial<ISoundsOptions>): boolean {
    return options?.sounds?.enable ?? false;
  }
}
