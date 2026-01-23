import type { CardValue } from "./CardValue.js";
import type { IShapeValues } from "@tsparticles/engine";
import type { SuitType } from "./SuitType.js";

export interface ICardData extends IShapeValues {
  suit: SuitType;
  value: CardValue;
}
