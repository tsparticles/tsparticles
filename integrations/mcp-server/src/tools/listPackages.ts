import { packageCatalog } from "../registry/packages.js";
import type { PackageCategory, PackageInfo } from "../types.js";

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

export function listPackages(filters?: {
  category?: string;
  query?: string;
}): {
  packages: Array<{
    name: string;
    description: string;
    category: string;
    loadFunction?: string;
  }>;
  total: number;
  categories: string[];
} {
  let results: PackageInfo[] = [];

  if (filters?.category && filters.category in packageCatalog.byCategory) {
    results = packageCatalog.byCategory[filters.category as PackageCategory];
  } else {
    for (const cat of categories) {
      results.push(...(packageCatalog.byCategory[cat] || []));
    }
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  results.sort((a, b) => a.name.localeCompare(b.name));

  return {
    packages: results.map((p) => ({
      name: p.name,
      description: p.description,
      category: p.category,
      loadFunction: p.loadFunction,
    })),
    total: results.length,
    categories,
  };
}
