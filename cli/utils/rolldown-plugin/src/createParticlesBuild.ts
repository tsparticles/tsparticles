import type { ParticlesBuildParams, RolldownConfig } from "./types";
import { type ParticlesBuildType, buildMap } from "./buildMap";
import { createConfig } from "./config/createConfig";
import { getIifePolicyData } from "./config/iifePolicy";

export const createParticlesBuild = (type: ParticlesBuildType, params: ParticlesBuildParams): RolldownConfig[] => {
  const def = buildMap[type],
    dir = params.dir,
    version = params.version,
    additionalExternals = params.additionalExternals,
    moduleName = params.moduleName,
    bundle = params.bundle,
    iifePolicy = getIifePolicyData(type, moduleName),
    banner = def.banner(params),
    minBanner = def.minBanner(params),
    base = createConfig({
      entry: {
        format: def.format,
        name: moduleName,
        bundle: false,
      },
      version,
      banner,
      minBanner,
      dir,
      bundle: false,
      includeLazy: false,
      iifePolicy,
      additionalExternals,
    });

  if (def.hasBundle && (bundle ?? true)) {
    return [
      ...base,
      ...createConfig({
        entry: {
          format: def.format,
          name: moduleName ? `${moduleName}.bundle` : "bundle",
          bundle: true,
        },
        version,
        banner,
        minBanner,
        dir,
        bundle: true,
        includeLazy: false,
        iifePolicy,
        additionalExternals,
      }),
    ];
  }

  return base;
};
