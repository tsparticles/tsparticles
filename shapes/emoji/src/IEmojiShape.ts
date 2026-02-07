import type { IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

export interface ISingleEmojiShape {
  font?: string;
  padding?: number;
  tint?: boolean;
  value: string;
}

export interface IEmojiShape extends IShapeValues {
  font?: string;
  padding?: number;
  tint?: boolean;
  value: SingleOrMultiple<string | ISingleEmojiShape>;
}
