import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath.js";
import { OptionLoader } from "../../../../../Utils/OptionsUtils.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../../ValueWithRandom.js";
import { deepExtend } from "../../../../../Utils/Utils.js";

/**
 * Path movement options.
 */
export class MovePath extends OptionLoader<IMovePath> implements IMovePath {
  clamp;
  delay;
  enable;
  generator?: string;
  options: PathOptions;

  constructor() {
    super();
    this.clamp = true;
    this.delay = new ValueWithRandom();
    this.enable = false;
    this.options = {};
  }

  doLoad(data: RecursivePartial<IMovePath>): void {
    if (data.clamp !== undefined) {
      this.clamp = data.clamp;
    }

    this.delay.load(data.delay);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.generator = data.generator;

    if (data.options) {
      this.options = deepExtend(this.options, data.options) as PathOptions;
    }
  }
}
