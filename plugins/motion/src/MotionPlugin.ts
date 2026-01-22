import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IMotionOptions, MotionOptions } from "./types.js";
import { Motion } from "./Options/Classes/Motion.js";

/**
 */
export class MotionPlugin implements IPlugin {
  readonly id;

  constructor() {
    this.id = "motion";
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { MotionPluginInstance } = await import("./MotionPluginInstance.js");

    return new MotionPluginInstance(container);
  }

  loadOptions(_container: Container, options: MotionOptions, source?: RecursivePartial<IMotionOptions>): void {
    if (!this.needsPlugin()) {
      return;
    }

    let motionOptions = options.motion;

    if (!motionOptions?.load) {
      options.motion = motionOptions = new Motion();
    }

    motionOptions.load(source?.motion);
  }

  needsPlugin(): boolean {
    return true;
  }
}
