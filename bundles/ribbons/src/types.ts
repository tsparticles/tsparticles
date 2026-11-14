import type { Container, RecursivePartial } from "@tsparticles/engine";
import type { IRibbonsOptions } from "./IRibbonsOptions.js";

/** Ribbons function first parameter type */
export type RibbonsFirstParam = string | RecursivePartial<IRibbonsOptions>;

/** Ribbons function type */
export type RibbonsFunc = (
  idOrOptions?: RibbonsFirstParam,
  ribbonsOptions?: RecursivePartial<IRibbonsOptions>,
) => Promise<Container | undefined>;

/** Animation API bound to an application-owned engine. */
export type RibbonsApi = RibbonsFunc & {
  /** Creates a ribbons animation bound to a specific canvas */
  create: (canvas?: HTMLCanvasElement | null, options?: RecursivePartial<IRibbonsOptions>) => Promise<RibbonsFunc>;

  /** Initializes the ribbons plugins */
  init: () => Promise<void>;

  /** The ribbons bundle version */
  version: string;
};
