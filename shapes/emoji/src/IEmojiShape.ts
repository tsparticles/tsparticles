import type { IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

/** Single emoji shape options */
export interface ISingleEmojiShape {
  /** Emoji font family */
  font?: string;
  /** Emoji padding */
  padding?: number;
  /** Emoji character value */
  value: string;
}

/** Emoji shape options */
export interface IEmojiShape extends IShapeValues {
  /** Emoji font family */
  font?: string;
  /** Emoji padding */
  padding?: number;
  /** Emoji value, single or multiple */
  value: SingleOrMultiple<string | ISingleEmojiShape>;
}
