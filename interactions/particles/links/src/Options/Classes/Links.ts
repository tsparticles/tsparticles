import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILinks } from "../Interfaces/ILinks.js";
import { LinksShadow } from "./LinksShadow.js";
import { LinksTriangle } from "./LinksTriangle.js";

/**
 * [[include:Options/Particles/Links.md]]
 */
export class Links implements ILinks, IOptionLoader<ILinks> {
  /** Enables random blinking of link colors */
  blink = false;
  /** Link line color */
  color = new OptionsColor();
  /** Whether a random color applies to all links (consent) */
  consent = false;
  /** Maximum link line distance */
  distance = 100;
  /** Enables particle links */
  enable = false;
  /** Link frequency */
  frequency = 1;
  /** Link ID for grouping */
  id?: string;
  /** Maximum link opacity */
  opacity = 1;
  /** Link shadow options */
  shadow = new LinksShadow();
  /** Link triangle fill options */
  triangles = new LinksTriangle();
  /** Enable link wrap around canvas edges */
  warp = false;
  /** Link line width */
  width = 1;

  constructor() {
    this.color.value = "#fff";
  }

  load(data?: RecursivePartial<ILinks>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "id", data.id);
    loadProperty(this, "blink", data.blink);

    this.color = OptionsColor.create(this.color, data.color);

    loadProperty(this, "consent", data.consent);
    loadProperty(this, "distance", data.distance);
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "frequency", data.frequency);
    loadProperty(this, "opacity", data.opacity);

    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);

    loadProperty(this, "width", data.width);
    loadProperty(this, "warp", data.warp);
  }
}
