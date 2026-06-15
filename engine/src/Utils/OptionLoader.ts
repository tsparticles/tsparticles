import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { isNull } from "./TypeUtils.js";

export abstract class OptionLoader<T> implements IOptionLoader<T> {
  load(data?: RecursivePartial<T>): void {
    if (isNull(data)) {
      return;
    }

    this.doLoad(data);
  }

  protected abstract doLoad(data: RecursivePartial<T>): void;
}

/**
 *
 * @param options - The options to handle
 * @param sourceOptionsArr - The sourceOptionsArr
 */
export function loadOptions<T>(
  options: IOptionLoader<T>,
  ...sourceOptionsArr: RecursivePartial<T | undefined>[]
): void {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}
