import type { ExternalData } from "../types";
import type { ExternalOption } from "rolldown";
import { getIifeGlobalForExternal } from "./iifePolicy";

interface Params {
  additionalExternals?: ExternalData[];
  bundle?: boolean;
}

const defaultGlobal = "window",
  getRootGlobal = (external: ExternalData): string => {
    const root = external.data.root;

    if (Array.isArray(root)) {
      return root.filter((t): t is string => typeof t === "string").join(".") || defaultGlobal;
    }

    return typeof root === "string" ? root : defaultGlobal;
  };

export const getExternal = ({ bundle, additionalExternals = [] }: Params): ExternalOption => {
  if (bundle) {
    return additionalExternals.filter(e => !e.bundle).map(e => e.name);
  }

  return [
    ...additionalExternals.map(e => e.name),
    /^tsparticles$/,
    /^tsparticles-/,
    /^@tsparticles\//,
  ];
};

export const getGlobals = (
  additionalExternals: ExternalData[] = [],
  bundle?: boolean,
): ((id: string) => string | undefined) => {
  const globalsAdditional = bundle ? additionalExternals.filter(e => !e.bundle) : additionalExternals,
    additionalMap = new Map(globalsAdditional.map(e => [e.name, getRootGlobal(e)]));

  return (id: string) => {
    if (additionalMap.has(id)) {
      return additionalMap.get(id) ?? defaultGlobal;
    }

    const tsparticlesGlobal = getIifeGlobalForExternal(id);

    if (tsparticlesGlobal) {
      // Root the shared namespace through `this` so `exposeEntryExports` can retarget the IIFE
      // wrapper from `this` to `globalThis` (keeping classic and module `<script>` tags working).
      return `this.${tsparticlesGlobal}`;
    }

    // Fall back to `window` only for genuine external module ids. Rollup also invokes the globals
    // function with the first segment of `output.name` (e.g. "__tsParticlesInternals") to build the
    // IIFE namespace setup; returning undefined there keeps the namespace root untouched instead of
    // rewriting it to `window` (which would break under `<script type="module">` where `this` is undefined).
    const looksLikeModuleId = id.includes("/") || id.includes("@") || id.includes(":") || id.startsWith("tsparticles");

    return looksLikeModuleId ? defaultGlobal : undefined;
  };
};
