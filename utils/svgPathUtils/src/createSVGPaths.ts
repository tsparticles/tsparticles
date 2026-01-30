import type { SVGPathData } from "./types.js";
import { safeDocument } from "@tsparticles/engine";

/**
 * @param data -
 * @returns the created SVG paths
 */
export function createSVGPaths(data: string[]): SVGPathData[] {
  const doc = safeDocument();

  return data.map(d => {
    const element = doc.createElementNS("http://www.w3.org/2000/svg", "path");

    element.setAttribute("d", d);

    return {
      element,
      length: element.getTotalLength(),
    };
  });
}
