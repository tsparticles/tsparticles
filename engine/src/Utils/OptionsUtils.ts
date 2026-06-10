import { OptionLoader, loadOptions } from "./OptionLoader.js";
import type { Container } from "../Core/Container.js";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";
import type { RangeValue } from "../Types/RangeValue.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { deepExtend } from "./Utils.js";
import { setRangeValue } from "./MathUtils.js";

export { OptionLoader, loadOptions };

/**
 * @param pluginManager -
 * @param container -
 * @param sourceOptionsArr -
 * @returns the newly created {@link ParticlesOptions} object
 */
export function loadParticlesOptions(
  pluginManager: PluginManager,
  container: Container,
  ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
  const options = new ParticlesOptions(pluginManager, container);

  loadOptions(options, ...sourceOptionsArr);

  return options;
}

/**
 *
 * @param obj
 * @param key
 * @param value
 */
export function loadProperty<T extends object, K extends keyof T>(obj: T, key: K, value: T[K] | undefined): void {
  if (value !== undefined) {
    obj[key] = value;
  }
}

/**
 *
 * @param obj
 * @param key
 * @param value
 */
export function loadRangeProperty<T extends object>(obj: T, key: keyof T, value: RangeValue | undefined): void {
  if (value !== undefined) {
    (obj as Record<string, unknown>)[key as string] = setRangeValue(value);
  }
}

/**
 *
 * @param obj
 * @param key
 * @param value
 */
export function loadNestedProperty(obj: object, key: string, value: RecursivePartial<unknown> | undefined): void {
  if (value !== undefined) {
    ((obj as Record<string, unknown>)[key] as IOptionLoader<unknown>).load(value);
  }
}

/**
 *
 * @param obj
 * @param key
 * @param value
 * @param factory
 */
export function loadLazyProperty(
  obj: object,
  key: string,
  value: RecursivePartial<unknown> | undefined,
  factory: () => IOptionLoader<unknown>,
): void {
  if (value !== undefined) {
    const objRecord = obj as Record<string, unknown>;

    objRecord[key] ??= factory() as unknown;
    (objRecord[key] as IOptionLoader<unknown>).load(value);
  }
}

/**
 *
 * @param obj
 * @param key
 * @param value
 */
export function loadExtendProperty<T extends object, K extends keyof T>(obj: T, key: K, value: T[K] | undefined): void {
  if (value !== undefined) {
    (obj as Record<string, unknown>)[key as string] = deepExtend(obj[key] ?? {}, value);
  }
}
