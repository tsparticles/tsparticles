import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import type { ILightMode, LightContainer, LightMode, LightParticle } from "./Types.js";
import { type PluginManager, type RecursivePartial, isInArray, rangeColorToRgb } from "@tsparticles/engine";
import { drawLight, lightMode } from "./Utils.js";
import { Light } from "./Options/Classes/Light.js";

export class ExternalLighter extends ExternalInteractorBase<LightContainer> {
  readonly maxDistance = 0;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: LightContainer) {
    super(container);

    this._pluginManager = pluginManager;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions,
      interactivity = interactivityData;

    if (!options.interactivity?.events.onHover.enable || interactivity.status !== "pointermove") {
      return;
    }

    const mousePos = interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    container.canvas.render.draw(ctx => {
      drawLight(container, ctx, mousePos);
    });
  }

  isEnabled(interactivityData: IInteractivityData, particle?: LightParticle): boolean {
    const container = this.container,
      mouse = interactivityData.mouse,
      interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
      events = interactivity?.events;

    if (!(events?.onHover.enable && mouse.position)) {
      return false;
    }

    const res = isInArray(lightMode, events.onHover.mode);

    if (res && interactivity?.modes.light) {
      const lightGradient = interactivity.modes.light.area.gradient;

      container.canvas.mouseLight = {
        start: rangeColorToRgb(this._pluginManager, lightGradient.start),
        stop: rangeColorToRgb(this._pluginManager, lightGradient.stop),
      };
    }

    return res;
  }

  loadModeOptions(options: Modes & LightMode, ...sources: RecursivePartial<(IModes & ILightMode) | undefined>[]): void {
    options.light ??= new Light();

    for (const source of sources) {
      options.light.load(source?.light);
    }
  }

  reset(): void {
    // do nothing
  }
}
