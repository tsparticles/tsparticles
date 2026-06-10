import { OptionLoader, loadProperty } from "../../../../../Utils/OptionsUtils.js";
import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../../ValueWithRandom.js";
import { deepExtend } from "../../../../../Utils/Utils.js";

/**
 * Path movement options.
 */
export class MovePath extends OptionLoader<IMovePath> implements IMovePath {
  clamp = true;
  readonly delay = new ValueWithRandom();
  enable = false;
  generator?: string;
  options: PathOptions = {};

  protected doLoad(data: RecursivePartial<IMovePath>): void {
    loadProperty(this, "clamp", data.clamp);
    this.delay.load(data.delay);
    loadProperty(this, "enable", data.enable);
    this.generator = data.generator;

    if (data.options) {
      this.options = deepExtend(this.options, data.options) as PathOptions;
    }
  }
}
