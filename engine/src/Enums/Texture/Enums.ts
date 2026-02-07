/**
 * Cache policy for texture rendering
 */
export enum CachePolicy {
  /**
   * Static cache - texture never changes during particle lifetime
   */
  Static = "static",

  /**
   * Dynamic cache - texture changes based on particle state updates
   */
  Dynamic = "dynamic",

  /**
   * Particle-specific cache - one texture per particle (no reuse)
   */
  Particle = "particle",
}

/**
 * Texture color rendering mode
 */
export enum TextureColorMode {
  /**
   * Single color mode - apply tinting via source-in blend mode
   */
  Single = "single",

  /**
   * Multi color mode - colors are pre-rendered in texture
   */
  Multi = "multi",
}

/**
 * Effect layer rendering order
 */
export enum EffectLayer {
  /**
   * Internal effects rendered before the shape
   */
  Internal = "internal",

  /**
   * External effects rendered after the shape (e.g., trails)
   */
  External = "external",
}
