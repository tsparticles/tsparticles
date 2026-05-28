import type { IRibbonsOptions } from "./IRibbonsOptions.js";
import type { RecursivePartial } from "@tsparticles/engine/lazy";

/** Ribbons options type */
export type RibbonsOptions = RecursivePartial<IRibbonsOptions>;

export * from "./ribbons.lazy.js";
export type * from "./RibbonsParams.js";
