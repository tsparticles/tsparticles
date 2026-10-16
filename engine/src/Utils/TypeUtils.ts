/**
 *
 * @param arg - the object to check
 * @returns true if the argument is a boolean
 */
export function isBoolean(arg: unknown): arg is boolean {
  return typeof arg === "boolean";
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is a string
 */
export function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is a number
 */
export function isNumber(arg: unknown): arg is number {
  return typeof arg === "number";
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is a function
 */
export function isFunction(arg: unknown): arg is (...args: unknown[]) => unknown {
  return typeof arg === "function";
}

/**
 *
 * @param enumObject - the enum object holding the allowed values
 * @param arg - the value to check
 * @returns true if the argument is a member of the given enum
 */
export function isEnumValue<T extends Record<string, string | number>>(enumObject: T, arg: unknown): arg is T[keyof T] {
  return Object.values(enumObject).some(enumValue => enumValue === arg);
}

/**
 * Converts a value to a valid enum member, falling back to the given default when the value is not a member.
 * @param enumObject - the enum object holding the allowed values
 * @param arg - the value to convert
 * @param defaultValue - the value returned when the argument is not a member of the enum
 * @returns the matching enum member or the given default
 */
export function toEnumValue<T extends Record<string, string | number>>(
  enumObject: T,
  arg: unknown,
  defaultValue: T[keyof T],
): T[keyof T] {
  return isEnumValue(enumObject, arg) ? arg : defaultValue;
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is an object
 */
export function isObject(arg: unknown): arg is object {
  return typeof arg === "object" && arg !== null;
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is an array
 */
export function isArray<T>(arg: unknown): arg is T[] {
  return Array.isArray(arg);
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is null or undefined
 */
export function isNull(arg: unknown): arg is null | undefined {
  return arg === null || arg === undefined;
}
