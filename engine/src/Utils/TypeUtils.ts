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
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(arg: unknown): arg is Function {
    return typeof arg === "function";
}

/**
 *
 * @param arg - the object to check
 * @returns true if the argument is an object
 */
export function isObject<T extends object>(arg: unknown): arg is T {
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
