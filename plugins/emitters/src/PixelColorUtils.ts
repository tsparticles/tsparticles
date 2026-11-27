import type { IOklcha, IRgb } from "@tsparticles/engine";
import { displayP3ToOklch, rgbToOklch } from "@tsparticles/engine";

/** Converts an emitter's sampled pixel to canonical OKLCH using its source primaries. */
export function sampledPixelToOklcha(color: IRgb, colorSpace?: "srgb" | "display-p3"): IOklcha {
  const converted = colorSpace === "display-p3" ? displayP3ToOklch(color) : rgbToOklch(color);

  return { ...converted, a: 1 };
}
