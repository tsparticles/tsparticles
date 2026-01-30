import type { SVGPathData } from "./types.js";

export interface LoadedSVGPaths {
  paths: SVGPathData[];
  size: {
    height: number;
    width: number;
  };
}

/**
 * @param svgText -
 * @returns the loaded SVG paths and the size of the SVG
 */
export function loadSVGFromString(svgText: string): LoadedSVGPaths {
  const parser = new DOMParser(),
    doc = parser.parseFromString(svgText, "image/svg+xml"),
    svg = doc.querySelector("svg");

  if (!svg) {
    return { paths: [], size: { width: 0, height: 0 } };
  }

  const pathElements = svg.querySelectorAll("path"),
    paths: SVGPathData[] = [];

  for (const node of pathElements) {
    if (!(node instanceof SVGPathElement)) {
      continue;
    }

    paths.push({
      element: node,
      length: node.getTotalLength(),
    });
  }

  const size = {
    width: Number.parseFloat(svg.getAttribute("width") ?? "0"),
    height: Number.parseFloat(svg.getAttribute("height") ?? "0"),
  };

  return {
    paths,
    size,
  };
}
