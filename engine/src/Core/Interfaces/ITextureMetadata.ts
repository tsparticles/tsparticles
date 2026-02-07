import type { CachePolicy, EffectLayer, TextureColorMode } from "../../Enums/Texture/Enums.js";
import type { Particle } from "../Particle.js";

/**
 * Texture component metadata used by the texture manager
 */
export interface ITextureMetadata {
  /**
   * Cache policy for this component
   */
  cachePolicy?: CachePolicy;

  /**
   * Color rendering mode for this component
   */
  colorMode?: TextureColorMode;

  /**
   * Effect layer where this component should be rendered
   */
  effectLayer?: EffectLayer;

  /**
   * Extra padding for cached textures (in canvas units)
   */
  padding?: number;

  /**
   * Tint composite operation mode ("source-in" for shapes, "color" for images/emoji, "multiply" for preserving transparency)
   */
  tintMode?: "source-in" | "color" | "multiply";
}

/**
 * Interface for components participating in texture caching
 */
export interface ITextureComponent<TParticle extends Particle = Particle> {
  /**
   * Returns a unique descriptor/hash for the component options
   * @param particle - the particle used for descriptor data
   */
  getDescriptor?: (particle: TParticle) => string;

  /**
   * Returns metadata for texture handling
   * @param particle - the particle used for metadata data
   */
  getMetadata?: (particle: TParticle) => ITextureMetadata | undefined;
}
