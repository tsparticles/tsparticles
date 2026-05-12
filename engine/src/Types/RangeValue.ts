import type { IRangeValue } from "../Core/Interfaces/IRangeValue.js";

/**
 * Numeric value that can be a fixed number or a min/max range object.
 */
export type RangeValue = number | IRangeValue;
