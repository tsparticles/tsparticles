import type { Particle } from "@tsparticles/engine";

export type FilterParticle = Particle & {
  filterBlur?: number | string;
  filterBrightness?: number;
  filterContrast?: number;
  filterDropShadow?: string;
  filterGrayscale?: number;
  filterHueRotate?: number | string;
  filterInvert?: number;
  filterOpacity?: number;
  filterSaturate?: number;
  filterSepia?: number;
  filterUrl?: string;
};
