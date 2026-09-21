import type { ErrorCode } from "./ErrorCodes.js";
import { messages } from "./ErrorMessages.js";

export { ErrorCodes } from "./ErrorCodes.js";

/**
 * Runtime catalog of code → message templates.
 *
 * It is seeded lazily with the engine's own {@link messages} and extended by every
 * plugin during its registration through {@link addErrorMessages}, so the engine only
 * ships the codes it owns and never grows with the plugin catalogs.
 */
let registeredMessages: Map<string, string> | undefined;

/**
 * Creates the message catalog on first use so production bundle sizes stay small.
 * @returns the engine message catalog
 */
const ensureRegisteredMessages = (): Map<string, string> => {
    registeredMessages ??= new Map(Object.entries(messages));

    return registeredMessages;
  },
  /**
   * Converts a value to a string for error messages without throwing on symbols.
   * @param value - The value to convert
   * @returns The string representation of the value
   */
  toStringValue = (value: unknown): string => String(value),
  /**
   * Replaces positional `{0}`, `{1}`, … placeholders in a template with the given arguments.
   * Missing arguments are left untouched so template typos surface in development.
   * @param template - the message template
   * @param args - the positional arguments
   * @returns the formatted message
   */
  format = (template: string, args: readonly unknown[]): string => {
    return template.replace(/\{(\d+)\}/g, (match: string, index: string): string => {
      const arg = args[Number(index)];

      return arg === undefined ? match : toStringValue(arg);
    });
  };

/**
 * Extends the runtime error-code catalog with the given code → message template entries.
 *
 * Plugins and other packages call this function during their registration (typically from
 * their `load*Plugin` entry point) so their codes resolve through {@link getErrorMessage}
 * without growing the engine catalog.
 *
 * In production builds the catalog is never read, so this becomes a no-op and bundlers
 * can drop the entire message table (constant-folded through `process.env.NODE_ENV`).
 * @param extraMessages - the code → message template entries to add
 */
export function addErrorMessages(extraMessages: Partial<Record<string, string>>): void {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- optional chaining would throw on a missing global
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    return;
  }

  const catalog = ensureRegisteredMessages();

  for (const [code, message] of Object.entries(extraMessages)) {
    if (message !== undefined) {
      catalog.set(code, message);
    }
  }
}

/**
 * Returns the full, formatted English message for an error code in development builds,
 * and a compact code plus link in production builds.
 *
 * The production branch can be constant-folded by the existing bundlers (`process.env.NODE_ENV`
 * replacement + dead-code elimination). The `typeof process` guard keeps bundler-less browsers from
 * throwing on the missing global; min builds fold it thanks to `@tsparticles/rollup-plugin`.
 * @param code - the stable error code
 * @param args - the positional arguments used to format the message
 * @returns the error message to surface
 */
export function getErrorMessage(code: ErrorCode, ...args: unknown[]): string {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- optional chaining would throw on a missing global
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    return `[tsParticles Error ${code}] https://particles.js.org/errors/#${code}`;
  }

  const template = ensureRegisteredMessages().get(code) ?? `Unknown error code ${code}`;

  return format(template, args);
}

declare const process:
  | {
      env: {
        NODE_ENV?: string;
      };
    }
  | undefined;
