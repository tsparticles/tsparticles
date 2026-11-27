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
