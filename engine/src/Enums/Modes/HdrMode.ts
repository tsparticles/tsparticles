/** HDR rendering mode presets */
export enum HdrMode {
  /** SDR colors as-is in P3 gamut, no tone mapping */
  standard = "standard",
  /** Faithful to original colors, tone mapping only */
  natural = "natural",
  /** Saturated and bright colors */
  vivid = "vivid",
  /** Warm tones, film look */
  cinematic = "cinematic",
  /** Auto-balanced based on scene luminance */
  dynamic = "dynamic",
}
