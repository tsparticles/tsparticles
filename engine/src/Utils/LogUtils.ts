/* eslint-disable no-console */
const errorPrefix = "tsParticles - Error",
  /**
   * Matches the production error format produced by {@link getErrorMessage},
   * e.g. `[tsParticles Error TSP-1001] https://particles.js.org/errors/#TSP-1001`.
   */
  codedErrorPattern = /^\[tsParticles Error (TSP-\d+)\]\s*/,
  fullMatchIndex = 0,
  codeIndex = 1;

/** Logger interface for tsParticles */
export interface ILogger {
  /** Debug log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  debug(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  /** Error log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  error(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  /** Info log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  info(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  /** General log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  log(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  /** Trace log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  trace(this: void, ...data: unknown[]): void;

  /** Verbose log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  verbose(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  /** Warning log */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  warning(this: void, message?: unknown, ...optionalParams: unknown[]): void;
}

const wrap =
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  <T extends unknown[]>(fn: (this: void, ...args: T) => void) =>
    (...args: T): void => {
      fn(...args);
    };

/** Creates an independent logger using console defaults for omitted methods. */
export function createLogger(logger: Partial<ILogger> = {}): ILogger {
  const defaults: ILogger = {
    debug: wrap(console.debug),

    error: (message?: unknown, ...optionalParams: unknown[]) => {
      if (typeof message === "string") {
        const match = codedErrorPattern.exec(message);

        if (match?.[codeIndex]) {
          console.error(
            `tsParticles - ${match[codeIndex]} - ${message.slice(match[fullMatchIndex].length)}`,
            ...optionalParams,
          );

          return;
        }
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`${errorPrefix} - ${message}`, ...optionalParams);
    },

    info: wrap(console.info),
    log: wrap(console.log),
    trace: wrap(console.trace),
    verbose: wrap(console.log),
    warning: wrap(console.warn),
  };

  return {
    debug: logger.debug ? wrap(logger.debug) : defaults.debug,
    error: logger.error ? wrap(logger.error) : defaults.error,
    info: logger.info ? wrap(logger.info) : defaults.info,
    log: logger.log ? wrap(logger.log) : defaults.log,
    trace: logger.trace ? wrap(logger.trace) : defaults.trace,
    verbose: logger.verbose ? wrap(logger.verbose) : defaults.verbose,
    warning: logger.warning ? wrap(logger.warning) : defaults.warning,
  };
}
