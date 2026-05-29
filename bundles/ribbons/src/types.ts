import type { Container, RecursivePartial } from "@tsparticles/engine";
import type { IRibbonsOptions } from "./IRibbonsOptions.js";

/** Ribbons function first parameter type */
export type RibbonsFirstParam = string | RecursivePartial<IRibbonsOptions>;

/** Ribbons function type */
export type RibbonsFunc = (
  idOrOptions?: RibbonsFirstParam,
  ribbonsOptions?: RecursivePartial<IRibbonsOptions>,
) => Promise<Container | undefined>;
