import type { IOptions } from "../Options/Interfaces/IOptions.js";
import type { RecursivePartial } from "./RecursivePartial.js";

/**
 * User-provided options input accepted by loaders.
 */
export type ISourceOptions = RecursivePartial<IOptions>;
