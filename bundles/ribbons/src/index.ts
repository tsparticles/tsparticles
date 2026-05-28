import type { IRibbonsOptions } from "./IRibbonsOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/** Ribbons options type */
export type RibbonsOptions = RecursivePartial<IRibbonsOptions>;

export * from "./ribbons.js";
export type * from "./RibbonsParams.js";
