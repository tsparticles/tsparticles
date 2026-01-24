/* eslint-disable no-console */
const errorPrefix = "tsParticles - Error";

interface ILogger {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  debug(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  error(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  info(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  log(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  verbose(this: void, message?: unknown, ...optionalParams: unknown[]): void;

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  warning(this: void, message?: unknown, ...optionalParams: unknown[]): void;
}

const _logger: ILogger = {
  debug: console.debug,
  error: (message, optionalParams) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`${errorPrefix} - ${message}`, optionalParams);
  },
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn,
};

/**
 * Replaces the library log functions with a custom one.
 * @param logger - A logger object responsible for logging messages.
 */
export function setLogger(logger: ILogger): void {
  _logger.debug = logger.debug;
  _logger.error = logger.error;
  _logger.info = logger.info;
  _logger.log = logger.log;
  _logger.verbose = logger.verbose;
  _logger.warning = logger.warning;
}

/**
 * Returns the logger object.
 * @returns the logger
 */
export function getLogger(): ILogger {
  return _logger;
}
