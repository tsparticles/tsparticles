import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILinks } from "../Interfaces/ILinks.js";
import { LinksShadow } from "./LinksShadow.js";
import { LinksTriangle } from "./LinksTriangle.js";

/**
 * [[include:Options/Particles/Links.md]]
 */
export class Links implements ILinks, IOptionLoader<ILinks> {
  /** Enables random blinking of link colors */
  blink;
  /** Link line color */
  color;
  /** Whether a random color applies to all links (consent) */
  consent;
  /** Maximum link line distance */
  distance;
  /** Enables particle links */
  enable;
  /** Link frequency */
  frequency;
  /** Link ID for grouping */
  id?: string;
  /** Maximum link opacity */
  opacity;
  /** Link shadow options */
  shadow;
  /** Link triangle fill options */
  triangles;
  /** Enable link wrap around canvas edges */
  warp;
  /** Link line width */
  width;

  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }

  /** @inheritDoc */
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
