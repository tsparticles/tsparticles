/** Ownership follows the browser resource, including across separate CDN module copies. */
export const canvasOwner = Symbol.for("@tsparticles/canvas-owner"),
  transferredCanvasKey = Symbol.for("@tsparticles/transferred-canvas");
