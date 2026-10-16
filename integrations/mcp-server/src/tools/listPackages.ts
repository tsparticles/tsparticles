import type { PackageCategory, PackageInfo } from "../types.js";
import { packageCatalog } from "../registry/packages.js";

const categories: PackageCategory[] = [
  "bundle",
  "plugin",
  "interaction-external",
  "interaction-particles",
  "interaction-light",
  "updater",
  "shape",
  "effect",
  "path",
  "emitter-shape",
  "color",
  "easing",
  "preset",
];

/**
 *
 * @param filters
 * @param filters.category
 * @param filters.query
 */
export function listPackages(filters?: { category?: string; query?: string }): {
  categories: string[];
  packages: {
    category: string;
    description: string;
    loadFunction?: string;
    name: string;
  }[];
  total: number;
} {
  let results: PackageInfo[];

  // Always start from a fresh copy — `results` must never be a direct
  // alias into `packageCatalog.byCategory[...]`. Previously, when a
  // valid `category` filter was given (and no `query`), `results` held
  // that direct reference, and the `.sort()` call below mutated the
  // catalog's shared in-memory array in place instead of a local copy.
  // The sort is a no-op in terms of *content* (alphabetical order is
  // stable either way), but mutating shared state from what should be a
  // read-only query is fragile — especially now that a single server
  // process can be handling several concurrent HTTP sessions that all
  // import the same `packageCatalog` module.
  if (filters?.category && filters.category in packageCatalog.byCategory) {
    results = [...packageCatalog.byCategory[filters.category as PackageCategory]];
  } else {
    results = [];
    for (const cat of categories) {
      results.push(...packageCatalog.byCategory[cat]);
    }
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  results.sort((a, b) => a.name.localeCompare(b.name));

  return {
    categories,
    packages: results.map(p => ({
      category: p.category,
      description: p.description,
      loadFunction: p.loadFunction,
      name: p.name,
    })),
    total: results.length,
  };
}
