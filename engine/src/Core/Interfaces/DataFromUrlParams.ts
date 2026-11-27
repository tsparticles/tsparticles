import type { ILogger } from "../../Utils/LogUtils.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

export interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  logger: ILogger;
  random: () => number;
  signal?: AbortSignal;
  url: SingleOrMultiple<string>;
}
