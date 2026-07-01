import { OptionLoader, loadOptions } from "./OptionLoader.js";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { RangeValue } from "../Types/RangeValue.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { deepExtend } from "./Utils.js";
import { setRangeValue } from "./MathUtils.js";

export { OptionLoader, loadOptions };

/**
 *
 * @param obj - The object
 * @param key - The key
 * @param value - The value
 */
export function loadProperty<T extends object, K extends keyof T>(obj: T, key: K, value: T[K] | undefined): void {
  if (value !== undefined) {
    obj[key] = value;
  }
}

/**
 *
 * @param obj - The object
 * @param key - The key
 * @param value - The value
 */
export function loadRangeProperty<T extends object>(obj: T, key: keyof T, value: RangeValue | undefined): void {
  if (value !== undefined) {
    (obj as Record<string, unknown>)[key as string] = setRangeValue(value);
  }
}

/**
 *
 * @param obj - The object
 * @param key - The key
 * @param value - The value
 */
export function loadNestedProperty(obj: object, key: string, value: RecursivePartial<unknown> | undefined): void {
  if (value !== undefined) {
    ((obj as Record<string, unknown>)[key] as IOptionLoader<unknown>).load(value);
  }
}

/**
 *
 * @param obj - The object
 * @param key - The key
 * @param value - The value
 * @param factory - The factory
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
 * @param obj - The object
 * @param key - The key
 * @param value - The value
 */
export function loadExtendProperty<T extends object, K extends keyof T>(obj: T, key: K, value: T[K] | undefined): void {
  if (value !== undefined) {
    const keyStr = key as string;

    if (keyStr === "__proto__" || keyStr === "constructor" || keyStr === "prototype") {
      return;
    }

    const objRecord = obj as Record<string, unknown>,
      currentValue = Object.prototype.hasOwnProperty.call(objRecord, keyStr) ? objRecord[keyStr] : {};

    objRecord[keyStr] = deepExtend(currentValue, value);
  }
}

/**
 * Loads a lazily-initialized option property from multiple sources.
 * @param obj - the target options object
 * @param key - the property key
 * @param optionClass - the option class constructor
 * @param sources - source objects to load from
 */
export function loadOptionProperty<T>(
  obj: object,
  key: string,
  optionClass: new () => IOptionLoader<T>,
  ...sources: (object | undefined)[]
): void {
  const objRecord = obj as Record<string, IOptionLoader<T>>;

  objRecord[key] ??= new optionClass();

  const target = objRecord[key];

  for (const source of sources) {
    target.load((source as Record<string, RecursivePartial<T> | undefined> | undefined)?.[key]);
  }
}
