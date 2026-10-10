import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

export interface DataFromUrlParams {
  fallback?: SingleOrMultiple<ISourceOptions>;
  index?: number;
  url: SingleOrMultiple<string>;
}
