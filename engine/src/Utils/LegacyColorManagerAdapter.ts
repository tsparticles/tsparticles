import type {
  IColorManager,
  ILegacyColorManager,
} from "../Core/Interfaces/IColorManager.js";
import { rgbToOklch } from "./OklchUtils.js";

/**
 * Adapts an sRGB-based color manager to the canonical OKLCH manager contract.
 * Conversion necessarily inherits the legacy manager's sRGB precision and gamut limits.
 */
export function adaptLegacyColorManager(
  manager: ILegacyColorManager,
): IColorManager {
  return {
    accepts: (input) => manager.accepts(input),
    handleColorOklch: (color) => {
      const rgb = manager.handleColor(color);

      return rgb ? { ...rgbToOklch(rgb), a: 1 } : undefined;
    },
    handleRangeColorOklch: (color) => {
      const rgb = manager.handleRangeColor(color);

      return rgb ? { ...rgbToOklch(rgb), a: 1 } : undefined;
    },
    parseStringOklch: (input) => {
      const rgba = manager.parseString(input);

      return rgba ? { ...rgbToOklch(rgba), a: rgba.a } : undefined;
    },
  };
}
